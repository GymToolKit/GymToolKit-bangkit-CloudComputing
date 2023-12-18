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

      const fileStream = this._bucket.file(destination).createWriteStream({
        gzip: true,
        resumable: false,
      });

      await new Promise((resolve, reject) => {
        fileStream.on('error', (error) => reject(error));
        file.on('end', resolve);
        file.pipe(fileStream);
      });
      
      const [url] = await this._bucket.file(destination).getSignedUrl({
        action: 'read',
        expires: '03-09-2025',
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
