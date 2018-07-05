function prefix(gender,firstName){
    if(gender === "female"){
        return `Mrs. ${firstName}`;
      } else{
        return `Mr. ${firstName}`;
      }
}

module.exports = prefix