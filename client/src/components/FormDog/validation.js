const validation = (dogInfo) => {
    const errors = {};
  
    if(dogInfo.name.length > 0 ){
      if(dogInfo.name.length < 5) {
      errors.name = 'Name debe ser mayor a 5 caracteres';
    }}
  
    if (dogInfo.bred_for.length > 0) {
    if (dogInfo.bred_for.length < 5) {
      errors.bred_for = 'Bred for debe ser mayor a 5 caracteres';
    }}
  
    if (dogInfo.breed_group.length > 0) {
    if (dogInfo.breed_group.length < 5) {
      errors.breed_group = 'Breed group debe ser mayor a 5 caracteres';
    }}
  
    if (dogInfo.origin.length > 0) {
    if (dogInfo.origin.length < 5) {
      errors.origin = 'Origin debe ser mayor a 5 caracteres';
    }}
  
    if (dogInfo.life_span.length > 0) {
    if (dogInfo.life_span.length < 2) {
      errors.life_span = 'Life span debe ser mayor a 2 caracteres';
    }else if(isNaN(parseInt(dogInfo.life_span))){
      errors.life_span = 'Life span debe ser numerico';
    }}
  
    if(dogInfo.minHeight.length > 0) {
    if (dogInfo.minHeight.length < 2) {
      errors.minHeight = 'Min height es necesario, debe ser mayor a 2';
    }else if(isNaN(parseInt(dogInfo.minHeight))){
      errors.minHeight = 'Min height debe ser numerico';
    }}

    if (dogInfo.maxHeight.length > 0) {
    if (dogInfo.maxHeight.length < 2) {
      errors.maxHeight = 'Max height es necesario, debe ser mayor a 2';
    }else if(isNaN(parseInt(dogInfo.maxHeight))){
      errors.maxHeight = 'maxHeight debe ser numerico';
    }}
  
    if (dogInfo.minWeight.length > 0) {
    if (dogInfo.minWeight.length < 2) {
      errors.minWeight = 'Min weight es necesario, debe ser mayor a 2';
    }else if(isNaN(parseInt(dogInfo.minWeight))){
      errors.minWeight = 'minWeight debe ser numerico';
    }}

    if (dogInfo.maxWeight.length > 0) {
    if (dogInfo.maxWeight.length < 2) {
      errors.maxWeight = 'Max weight es necesario, debe ser mayor a 2';
    }else if(isNaN(parseInt(dogInfo.maxWeight))){
      errors.maxWeight = 'maxWeight debe ser numerico';
    }}


    if (
      dogInfo.temperamentId1 === dogInfo.temperamentId2 ||
      dogInfo.temperamentId1 === dogInfo.temperamentId3 ||
      dogInfo.temperamentId1 === dogInfo.temperamentId4    
      ) { errors.temperamentId1 = 'No Repita tempramentos!!';}

    if (
       dogInfo.temperamentId2 === dogInfo.temperamentId1 ||
      dogInfo.temperamentId2 === dogInfo.temperamentId3  ||
      dogInfo.temperamentId2 === dogInfo.temperamentId4    
      ) { errors.temperamentId1 = 'No Repita tempramentos!!';}
    
    if (
       dogInfo.temperamentId3 === dogInfo.temperamentId1 ||
      dogInfo.temperamentId3 === dogInfo.temperamentId2  ||
      dogInfo.temperamentId3 === dogInfo.temperamentId4    
     ) { errors.temperamentId1 = 'No Repita tempramentos!!';}

     if (
      dogInfo.temperamentId4 === dogInfo.temperamentId1 ||
      dogInfo.temperamentId4 === dogInfo.temperamentId2  ||
      dogInfo.temperamentId4 === dogInfo.temperamentId3    
     ) { errors.temperamentId1 = 'No Repita tempramentos!!';}
    
    if (!dogInfo.image) {
      errors.image = 'Ingrese una Imagen';
    }


    return errors;
  };
  
  export default validation;

