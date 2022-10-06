const CityOption = ({ item, choicePass }) => {
  const passCityData = () => {
    choicePass(item);
  };

  return (
    <div className="city-option" onClick={passCityData}>
      {item?.formatted}
    </div>
  );
}

export default CityOption;
