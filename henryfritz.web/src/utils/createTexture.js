// Create a black and white gradient texture as a data URL
export const createGradientTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  // Create a radial gradient from white center to black edges
  const gradient = ctx.createRadialGradient(256, 256, 50, 256, 256, 300);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(0.5, '#888888');
  gradient.addColorStop(1, '#000000');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  
  return canvas.toDataURL();
};

// Alternative: Create a noise texture
export const createNoiseTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(512, 512);
  
  for (let i = 0; i < imageData.data.length; i += 4) {
    const value = Math.random() * 255;
    imageData.data[i] = value;     // R
    imageData.data[i + 1] = value; // G
    imageData.data[i + 2] = value; // B
    imageData.data[i + 3] = 255;   // A
  }
  
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
};

// Create a striped pattern
export const createStripedTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  const stripeWidth = 40;
  for (let i = 0; i < 512; i += stripeWidth * 2) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(i, 0, stripeWidth, 512);
    ctx.fillStyle = '#000000';
    ctx.fillRect(i + stripeWidth, 0, stripeWidth, 512);
  }
  
  return canvas.toDataURL();
};

