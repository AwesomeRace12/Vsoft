import React, { Fragment } from 'react';

import clsx from 'clsx';

import { Paper, List, ListItem, ListItemText } from '@material-ui/core';

import { connect } from 'react-redux';

const Footer = props => {
  const { footerFixed } = props;
  return (
    <Fragment>
      <Paper
        square
        className={clsx('app-footer text-black-50', {
          'app-footer--fixed': footerFixed
        })}>
        <div className="app-footer--inner">
          <div className="app-footer--first">
            <List dense className="d-flex align-items-center">
              <ListItem
                className="rounded-sm text-nowrap"
                button
                component="a"
                href="https://vsoft-usa.com"
                target="_blank"
                rel="noopener">
                <ListItemText primary="VSoft-USA" />
              </ListItem>
            </List>
          </div>
          <div className="app-footer--second">
            <span>iProcess</span>
          </div>
        </div>
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  footerFixed: state.ThemeOptions.footerFixed
});
export default connect(mapStateToProps)(Footer);
