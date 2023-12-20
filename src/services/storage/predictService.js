const tf = require('@tensorflow/tfjs-node');

class PredictService {
  constructor(modelPath) {
    if (!modelPath) {
      throw new Error('model path are required.');
    }
    this._modelPath = modelPath;
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
  adjustArrayLength(array, targetLength) {
    if (array.length > targetLength) {
      return array.slice(0, targetLength);
    } else if (array.length < targetLength) {
      return [...array, ...Array(targetLength - array.length).fill(0)];
    } else {
      return array;
    }
  }
  async predictImageUsingTFJS(image) {
    try {
      const imageArray = await this.readImageToArray(image);
      const width = 180;
      const height = 180;
  
    
      const expectedSize = 1 * height * width * 3;
      const adjustedArray = this.adjustArrayLength(imageArray, expectedSize);
    
      const reshapedData = tf.tensor4d(adjustedArray, [1, height, width, 3]);
  
      const normalizedData = tf.div(reshapedData, 255.0);
  
      const predictions = this._model.predict(normalizedData).dataSync();
  
      const maxIndex = predictions.indexOf(Math.max(...predictions));

      let label;
      switch (maxIndex) {
        case 0:
          label = 'Barbell';
          break;
        case 1:
          label = 'Bench Press';
          break;
        case 2:
          label = 'Dip Bar';
          break;
        case 3:
          label = 'Dumbbell';
          break;
        case 4:
          label = 'Elliptical Machine';
          break;
        case 5:
          label = 'EZ Curl Bar';
          break;
        case 6:
          label = 'Leg Press Machine';
          break;
        case 7:
          label = 'Roller Abs';
          break;
        case 8:
          label = 'Seated Cable Row';
          break;
        case 9:
          label = 'Static Bike';
          break;
        case 10:
          label = 'Treadmill';
          break;
        default:
          label = 'Unknown';
      }
      return { label };
    } catch (error) {
      console.error('Error in predictImageUsingTFJS:', error);
      throw error;
    }
  }
  
  async readImageToArray(image) {
    return new Promise((resolve, reject) => {
      const chunks = [];
  
      image.on('data', (chunk) => chunks.push(chunk));
      image.on('end', () => resolve(Buffer.concat(chunks)));
      image.on('error', (error) => reject(error));
    });
  }
}

module.exports = PredictService;
