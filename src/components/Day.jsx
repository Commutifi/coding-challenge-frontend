const Day = ({ item, title, showCelsius, changeMetrics }) => {
  return (
    <div className="day">
      <h3 className="day__header">{title}</h3>

      <div className={"day__value day__value_" + item?.colorClass} onClick={changeMetrics}>
        {showCelsius ? item?.celsius : item?.fahrenheit}
      </div>
    </div>
  );
}

export default Day;
