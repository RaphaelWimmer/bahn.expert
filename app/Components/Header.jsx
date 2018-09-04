// @flow
import { connect } from 'react-redux';
import { getStationsFromAPI, setCurrentStation } from 'actions/abfahrten';
import ActionHome from '@material-ui/icons/Home';
import AppBar from '@material-ui/core/AppBar';
import HeaderButtons from './HeaderButtons';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Select from 'react-select/lib/Async';
import Toolbar from '@material-ui/core/Toolbar';
import type { AppState } from 'AppState';
import type { ContextRouter } from 'react-router';
import type { Station } from 'types/abfahrten';

type ReduxProps = {
  currentStation: ?$PropertyType<$PropertyType<AppState, 'abfahrten'>, 'currentStation'>,
};

type Props = ReduxProps &
  ContextRouter & {
    setCurrentStation: typeof setCurrentStation,
  };

const selectStyles = {
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? 'lightgrey' : 'white',
    color: 'black',
  }),
  container: () => ({
    flex: 1,
    position: 'relative',
  }),
};

class Header extends React.Component<Props> {
  submit = (station: Station) => {
    if (!station) {
      return;
    }
    const { setCurrentStation } = this.props;

    setCurrentStation(station);
    this.props.history.push(`/${encodeURIComponent(station.title)}`);
  };
  toRoot = () => this.props.history.push('/');
  filterOption(option: any) {
    return option;
  }
  getOptionLabel = (station: Station) => station.title;
  getOptionValue = (station: Station) => station.id;
  render() {
    const { currentStation } = this.props;

    return (
      <AppBar position="fixed">
        <Toolbar>
          <IconButton onClick={this.toRoot} color="inherit">
            <ActionHome color="inherit" />
          </IconButton>
          <Select
            styles={selectStyles}
            loadOptions={getStationsFromAPI}
            getOptionLabel={this.getOptionLabel}
            getOptionValue={this.getOptionValue}
            placeholder="Bahnhof (z.B. Hamburg Hbf)"
            value={currentStation}
            onChange={this.submit}
          />
          <HeaderButtons />
        </Toolbar>
      </AppBar>
    );
  }
}

export default connect(
  (state: AppState): ReduxProps => ({
    currentStation: state.abfahrten.currentStation,
  }),
  {
    setCurrentStation,
  }
)(Header);