import React from 'react';
import { PropTypes } from 'prop-types';
import * as HoverCard from '@radix-ui/react-hover-card';

export default class HoverCardTitle extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <div
        className="title__div"
      >
        <HoverCard.Root openDelay={ 0 } closeDelay={ 0 }>
          <HoverCard.Trigger className="product__title" asChild>
            <h1>
              {title}
            </h1>
          </HoverCard.Trigger>
          <HoverCard.Content
            side="right"
            className="HoverCardContent"
          >
            <HoverCard.Arrow className="HoverCardArrow" />
            {title}
          </HoverCard.Content>
        </HoverCard.Root>
      </div>
    );
  }
}

HoverCardTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
