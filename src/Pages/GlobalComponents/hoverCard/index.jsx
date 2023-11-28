import React from 'react';
import { PropTypes } from 'prop-types';
import * as HoverCard from '@radix-ui/react-hover-card';

import './hoverCard.css';

export default class HoverCardTitle extends React.Component {
  render() {
    const { title, className } = this.props;
    return (
      <div className="hover__card">
        <HoverCard.Root openDelay={ 0 } closeDelay={ 0 }>
          <HoverCard.Trigger className={ className } asChild>
            <h1>
              {title}
            </h1>
          </HoverCard.Trigger>
          <HoverCard.Content
            side="right"
            className="hover__card__content"
          >
            <HoverCard.Arrow className="hover__card__arrow" />
            {title}
          </HoverCard.Content>
        </HoverCard.Root>
      </div>
    );
  }
}

HoverCardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
