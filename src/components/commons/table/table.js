import React, {Component} from 'react';
import {dataTable, dataTableFinal} from '../../../utils/utilForm';
import './table.scss';

class Table extends Component {
  render () {
    const {headers, data} = this.props;
    const dataColumns = data.map (d => dataTable (d));
    var i = 1;
    return (
      <div className="table__table-wrapper table table-striped table-bordered">
        <strong className="table__title">
          <h1>Sesiones</h1>
        </strong>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Sesión</th>
              <th>Portal</th>
              <th>Plataforma</th>
              <th>Fecha</th>
              <th>Evento</th>
            </tr>
          </thead>
          <tbody>
            {dataColumns.map ((d, index) => (
              <tr key={d}>
                <td className="table__session-id">{i++}</td>
                <td className="table__portal">{d[1]}</td>
                <td className="table__platform">{d[2]}</td>
                <td className="table__session-date">{d[3]}</td>
                <td className="table__session-date">
                  {
                    <div>
                      <p>{`Id: ${Object.values (d[4])[0].id}`}</p>
                      <p
                      >{`Event Date: ${Object.values (d[4])[0].eventdate}`}</p>
                      <p
                      >{`Description: ${Object.values (d[4])[0].description}`}</p>
                      <p>{`Type: ${Object.values (d[4])[0].type}`}</p>
                    </div>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
