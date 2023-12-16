const { Storage } = require('@google-cloud/storage');

class StorageService {
  constructor(bucketName, keyFilename) {
    this._bucketName = bucketName;
    this._keyFilename = keyFilename;
    
    if (!this._bucketName || !this._keyFilename) {
      throw new Error('Bucket name and key filename are required.');
    }

    this._storage = new Storage({ keyFilename: this._keyFilename });
    this._bucket = this._storage.bucket(this._bucketName);
  }

  async writeFile(file, meta) {
    try {
      const filename = +new Date() + meta.filename;
      const destination = `uploads/${filename}`;

      // Create a writable stream to upload the file to Google Cloud Storage
      const fileStream = this._bucket.file(destination).createWriteStream({
        gzip: true,
        resumable: false, // Set to true if you want to use resumable uploads
      });

      // Wait for the file to be uploaded to Google Cloud Storage
      await new Promise((resolve, reject) => {
        fileStream.on('error', (error) => reject(error));
        file.on('end', resolve);
        file.pipe(fileStream);
      });

      // Generate a signed URL for the uploaded file
      const [url] = await this._bucket.file(destination).getSignedUrl({
        action: 'read',
        expires: '03-09-2025', // Adjust the expiration date as needed
      });

      // Return the URL
      return url;
    } catch (error) {
      console.error('Error in writeFile:', error);
      throw error;
    }
  }
}

module.exports = StorageService;
