import PerspT from 'perspective-transform';

// Helper function to calculate the transformCoordinates
const getTransformCoordinates = (srcCorners, dstCorners) => {  
  const perspT = PerspT(srcCorners, dstCorners);
  const coeffs = perspT.coeffs; 
  const transformCoordinates = [
    coeffs[0], coeffs[3], 0, coeffs[6],
    coeffs[1], coeffs[4], 0, coeffs[7],
            0,         0, 1,         0,
    coeffs[2], coeffs[5], 0, coeffs[8]
  ];
  return transformCoordinates.join(', ');
};

export default getTransformCoordinates;