import React, { Component } from 'react';
import Period from 'components/Period';
import { loadDate, getDateFromLocalStorage, setDateToLocalStorage } from 'api.js';

export default class DateRange extends Component {
  state = {
    date: '',
    updateTime: ''
  };

  inputRef = React.createRef();

  componentDidMount() {
    const input = this.inputRef.current;
    const dateFromLocalStor = getDateFromLocalStorage();

    input.onfocus = () => {
      input.style.backgroundColor = '#900';
    };
    input.onblur = () => {
      input.style.backgroundColor = '#fff';
    };

    dateFromLocalStor ? this.setState({ date: dateFromLocalStor }) : this.setState({ date: new Date() })

    loadDate()
      .then(ms => {
        this.setState({ updateTime: ms });
      })
      .catch(err => {
        console.error(err.message);
      });
  }

  changeInputHandl = e => {
    const date = Date.parse(e.target.value);
    setDateToLocalStorage(date);

    loadDate()
      .then(ms => {
        this.setState({ updateTime: ms, date });
      })
      .catch(err => {
        console.error(err.message);
      });
  };

  createPeriod = date => {
    const newDate = new Date(+date);
    newDate.setFullYear(newDate.getFullYear() + 1);

    return {
      start: date,
      end: +newDate
    };
  };

  createItems = period => {
    const start = new Date(+period.start);
    const end = new Date(+period.end);
    const periods = [];

    for (let i = +start; i < +end; i += 3600000 * 168) {
      let periodStart = new Date(i);
      let periodEnd = new Date(i);

      periodStart.setDate(periodStart.getDate() + 1 - periodStart.getDay());
      periodEnd.setDate(periodEnd.getDate() + 7 - periodEnd.getDay());

      if (i === +start) {
        if (start.getDay() === 0) {
          periods.push(`${start.toDateString()} - ${start.toDateString()}`);
        } else {
          periodStart = start;
        }
      }

      if (+periodEnd > +end) {
        periodEnd = end;
      }

      periods.push(
        `${periodStart.toDateString()} - ${periodEnd.toDateString()}`
      );
    }

    return periods;
  };

  render() {
    const { date, updateTime } = this.state;
    const periods = this.createItems(this.createPeriod(date));

    return (
      <div className="periods">
        <input
          className="periods__date"
          type="date"
          value={formatDate(date)}
          ref={this.inputRef}
          onChange={this.changeInputHandl}
        />
        <div>
          {`Последнее изменение: ${formatDate(updateTime)
            .split('-')
            .reverse()
            .join('.')} ${new Date(+updateTime).toTimeString()}`}
        </div>
        <ul className="periods__list">
          {periods.map((period, index) => {
            return <Period key={index} period={period} />;
          })}
        </ul>
      </div>
    );
  }
}

function formatDate(date) {
  if (!date) return '';
  date = new Date(+date);

  let d = date.getDate();
  if (d < 10) d = '0' + d;

  let m = date.getMonth() + 1;
  if (m < 10) m = '0' + m;

  let y = date.getFullYear();

  return `${y}-${m}-${d}`;
}