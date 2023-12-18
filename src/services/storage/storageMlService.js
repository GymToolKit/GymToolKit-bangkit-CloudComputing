const { Storage } = require('@google-cloud/storage');
const tf = require('@tensorflow/tfjs-node');
const fetch = require('node-fetch');

class StorageService {
  constructor(bucketName, keyFilename, modelPath) {
    this._modelPath = modelPath;
    this._bucketName = bucketName;
    this._keyFilename = keyFilename;

    if (bucketName === undefined || keyFilename === undefined || modelPath === undefined) {
      throw new Error('Bucket name, key filename, and model path are required.');
    }

    this._storage = new Storage({ keyFilename: this._keyFilename });
    this._bucket = this._storage.bucket(this._bucketName);

    this._model = null;
    this.loadModel();
  }

  async loadModel() {
    try {
      this._model = await tf.loadLayersModel(`file://${this._modelPath}`);
      console.log('Model loaded successfully.');
    } catch (error) {
      console.error('Error loading the model:', error);
      throw error;
    }
  }

  async uploadImage(file, meta) {
    try {
      const filename = `${+new Date()}-${meta.filename}`;
      const destination = `uploads/${filename}`;

      const fileStream = this._bucket.file(destination).createWriteStream({
        gzip: true,
        resumable: false,
      });

      await new Promise((resolve, reject) => {
        fileStream.on('error', reject);
        fileStream.once('finish', resolve);
        file.pipe(fileStream);
      });

      const [url] = await this._bucket.file(destination).getSignedUrl({
        action: 'read',
        expires: '03-09-2025',
      });

      return url;
    } catch (error) {
      console.error('Error in uploadImage:', error);
      throw error;
    }
  }

  async predictImage(url) {
    try {
      const image = await this.loadImage(url);
      const predictions = this._model.predict(image);

      return predictions;
    } catch (error) {
      console.error('Error in predictImage:', error);
      throw error;
    }
  }

  async loadImage(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    const image = await tf.node.decodeImage(new Uint8Array(await blob.arrayBuffer()));
    return image;
  }
}

module.exports = StorageService;
