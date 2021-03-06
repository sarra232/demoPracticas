/*jshint esversion: 6 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import Input from '../../components/commons/input/Input';
import Select from '../../components/commons/select/Select';
import DropDown from '../../components/commons/dropDown/DropDown';
import Button from '../../components/commons/button/Button';
import Error from '../../components/commons/error/error';
import validate from '../../components/commons/formValidations/formValidations';
import {
  getIdentifiers,
  gettypeIdentifiersSelectOptions,
  calendar,
  utilFormSingle,
  getDropDownValue,
  getChilds,
} from '../../utils/utilForm';
import BootstrapTable from '../../components/commons/table/table';
import Box from '../../components/commons/box/Box';
import Spinner from '../../components/commons/spinner/spinner';
import {getFingerSearchRequest} from '../../actions/fingerSearch';

import './searchSingle.scss';

class SearchSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {advanceSearch: false, closeError: false};
  }
  errorClick = () => {
    this.setState({closeError: true});
  };

  componentDidMount() {
    getIdentifiers(this.props.configurationInfo.identifiers.primario);
  }

  advanceClick = () => {
    this.setState({advanceSearch: !this.state.advanceSearch});
  };

  render() {
    const {
      configurationInfo,
      fingerSearch,
      handleSubmit,
      platformField,
      portal,
      category,
      typeCategory,
      fetching,
      errors,
    } = this.props;

    const showPlatforms = () => {
      return getDropDownValue(configurationInfo.filters);
    };
    const showPortals = () => {
      if (platformField && platformField.length) {
        return getDropDownValue(
          getChilds(showPlatforms(), platformField[0].value)
        );
      }
      return null;
    };
    const showCategories = () => {
      if (portal && portal.length) {
        if (platformField && platformField.length && portal && portal.length) {
          return getDropDownValue(getChilds(showPortals(), portal[0].value));
        }
      }
    };

    const showTypeCategories = () => {
      if (category && category.length) {
        if (
          platformField &&
          platformField.length &&
          portal &&
          portal.length &&
          category &&
          category.length
        ) {
          return getDropDownValue(
            getChilds(showCategories(), category[0].value)
          );
        }
      }
    };

    return (
      <div className="search-single">
        {fetching && <Spinner />}
        {errors && !this.state.closeError && (
          <Error
            errorClick={this.errorClick}
            error={
              fingerSearch &&
              fingerSearch.length &&
              fingerSearch.customer &&
              errors
                ? 'La busqueda por estos parametros no arroja resultados'
                : 'Usuario no encontrado'
            }
          />
        )}
        <article>
          <form
            className="search-single__form"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div className="search-single__form--container">
              <div>
                <div className="search-single__wrapper-colums-standard">
                  <div className="search-single__column">
                    <Field
                      id="time"
                      name="time"
                      label={'Seleccione rango de tiempo'}
                      component={Select}
                    >
                      <option value="">Selecione tiempo</option>
                      {calendar.map((cal) => (
                        <option key={cal.value} value={cal.value}>
                          {cal.value}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="search-single__column">
                    <Field
                      id="typeIndentifiers"
                      name="typeIndentifiers"
                      label={'Tipo de identificador'}
                      placeholder={'seleccione una opción'}
                      component={Select}
                    >
                      <option value="">Seleccione una opción</option>
                      {Object.values(
                        getIdentifiers(configurationInfo.identifiers.primario)
                      ).map((i) => (
                        <option key={i.type} value={[i.scope, i.type, i.date]}>
                          {gettypeIdentifiersSelectOptions(
                            i.type.toLocaleLowerCase()
                          )}
                        </option>
                      ))}
                    </Field>
                  </div>
                  <div className="search-single__column">
                    <Field
                      id="identifier"
                      name="identifier"
                      label={'Ingrese identificador'}
                      type="text"
                      placeholder={'Ingrese un identicador'}
                      component={Input}
                    />
                  </div>
                </div>
                {this.state.advanceSearch && (
                  <div className="search-single__wrapper-colums-standard">
                    <div className="search-single__column">
                      <Field
                        id="platform"
                        name="platform"
                        label={'Plataforma'}
                        placeholder={'Seleccione una plataforma'}
                        isMulti={true}
                        multi
                        props
                        field
                        options={showPlatforms().map((p) => ({
                          label: gettypeIdentifiersSelectOptions(p.key),
                          value: {
                            key: p.key,
                            value: {
                              lastDate: p.values.lastDate,
                              hasChild: p.values.hasChild,
                            },
                          },
                        }))}
                        component={DropDown}
                      />
                    </div>
                    {platformField &&
                      platformField.length === 1 &&
                      Object.values(platformField[0].value)[1].hasChild && (
                        <div className="search-single__column">
                          <Field
                            id="portal"
                            name="portal"
                            label={'Portal'}
                            placeholder={'Seleccione una opción'}
                            isMulti={true}
                            multi
                            props
                            options={showPortals().map((p) => ({
                              label: gettypeIdentifiersSelectOptions(p.key),
                              value: {
                                key: p.key,
                                value: {
                                  lastDate: p.values.lastDate,
                                  hasChild: p.values.hasChild,
                                },
                              },
                            }))}
                            component={DropDown}
                          />
                        </div>
                      )}
                    {platformField &&
                      platformField.length === 1 &&
                      Object.values(platformField[0].value)[1].hasChild &&
                      portal &&
                      portal.length === 1 &&
                      Object.values(portal[0].value)[1].hasChild && (
                        <div className="search-single__column">
                          <Field
                            id="category"
                            name="category"
                            label={'Categoria'}
                            placeholder={'Seleccione una opción'}
                            isMulti={true}
                            multi
                            props
                            options={showCategories().map((p) => ({
                              label: p.key.toLocaleLowerCase(),
                              value: {
                                key: p.key,
                                value: {
                                  lastDate: p.values.lastDate,
                                  hasChild: p.values.hasChild,
                                },
                              },
                            }))}
                            component={DropDown}
                          />
                        </div>
                      )}
                    {platformField &&
                      platformField.length === 1 &&
                      Object.values(platformField[0].value)[1].hasChild &&
                      portal &&
                      portal.length === 1 &&
                      Object.values(portal[0].value)[1].hasChild &&
                      category &&
                      category.length === 1 &&
                      Object.values(category[0].value)[1].hasChild && (
                        <div className="search-single__column">
                          <Field
                            id="typeCategory"
                            name="typeCategory"
                            label={'Seleccione tipo de categoria'}
                            placeholder={'Seleccione una opción'}
                            isMulti={true}
                            multi
                            props
                            options={showTypeCategories().map((p) => ({
                              label: p.key.toLocaleLowerCase(),
                              value: {
                                key: p.key,
                                value: {
                                  lastDate: p.values.lastDate,
                                  hasChild: p.values.hasChild,
                                },
                              },
                            }))}
                            component={DropDown}
                          />
                        </div>
                      )}
                  </div>
                )}
              </div>
              <div className="search-single__wrapper-button">
                <Button children={'Buscar'} />
                <Button
                  children={`Busqueda avanzada ${
                    this.state.advanceSearch ? '-' : '+'
                  }`}
                  onclick={this.advanceClick}
                />
              </div>
            </div>
          </form>
        </article>
        {!errors && (
          <article>
            {fingerSearch && fingerSearch.customer && (
              <Box data={fingerSearch.customer} />
            )}
            {fingerSearch &&
              fingerSearch.finger &&
              Object.values(fingerSearch.finger)[0] && (
                <BootstrapTable
                  headers={Object.keys(Object.values(fingerSearch.finger)[0])}
                  data={Object.values(Object.values(fingerSearch.finger))}
                />
              )}
          </article>
        )}
      </div>
    );
  }
}

const EnhanceSingletForm = reduxForm({
  form: 'searchSingleForm',
  validate,
  onSubmit: (values, dispatch) => {
    const request = utilFormSingle(values);
    return dispatch(getFingerSearchRequest(request));
  },
});

const mapStateToProps = (state) => {
  const selector = formValueSelector('searchSingleForm');
  const platformField = selector(state, 'platform');
  const portal = selector(state, 'portal');
  const category = selector(state, 'category');
  const typeCategory = selector(state, 'typeCategory');
  return {
    platformField,
    portal,
    category,
    typeCategory,
    configurationInfo: state.configInfo.data,
    fingerSearch: state.fingerSearchs.fingerSearch,
    fetching: state.fingerSearchs.fetching,
    errors: state.fingerSearchs.error,
  };
};
const mapDispatchToProps = {
  getFingerSearchRequest,
};

const connectEnhace = connect(mapStateToProps, mapDispatchToProps);

export default compose(connectEnhace, EnhanceSingletForm)(SearchSingle);
