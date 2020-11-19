// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import {
  Card,
  TitleCard,
  CardBody,
  CardImage,
  CardImageEffect,
  CardColumn,
  CardGrid,
} from '../../src/components/Card';
import Button from '../../src/components/Button';

// Tests
describe('Card components tests', () => {
  test('Card component draws correctly', () => {
    const wrapper = shallow(<Card title="Title" textRight></Card>);

    expect(wrapper).toMatchSnapshot();
  });

  test('TitleCard component draws correctly', () => {
    const wrapper = shallow(<TitleCard img="src" button buttonText="button"></TitleCard>);

    expect(wrapper).toMatchSnapshot();
  });

  test('CardBody draws correctly', () => {
    const wrapper = shallow(<CardBody title="title"></CardBody>);

    expect(wrapper).toMatchSnapshot();
  });

  test('CardImage draws correctly', () => {
    const wrapper = shallow(
      // $FlowExpectedError
      <CardImage title="title" img="src" imgAlt="alt" button buttonText="button"></CardImage>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('CardImageEffect draws correctly', () => {
    const wrapper = shallow(
      <CardImageEffect title="title" img="src" imgAlt="alt" link="/link"></CardImageEffect>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('CardColumn draws correctly', () => {
    const wrapper = shallow(<CardColumn></CardColumn>);

    expect(wrapper).toMatchSnapshot();
  });

  test('CardGrid draws correctly', () => {
    const wrapper = shallow(
      <CardGrid columns={1} columnsSm={2} columnsMd={3} columnsLg={4}></CardGrid>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
