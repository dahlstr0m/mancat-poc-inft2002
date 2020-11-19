// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

// Components
import ProjectRanking from '../../src/components/ProjectRanking';
import Button from '../../src/components/Button';

// Mocks
jest.mock('../../src/services/project-service');
jest.mock('../../src/services/poster-service');

// Tests
describe('ProjectRanking component tests', () => {
  test('ProjectRanking draws correctly', (done) => {
    const wrapper = shallow(<ProjectRanking />);

    // Wait for events to complete
    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();

      done();
    });
  });

  test('ProjectRanking rankDown works as expected', (done) => {
    const wrapper = shallow(<ProjectRanking />);

    setTimeout(() => {
      expect(
        wrapper
          .find('img')
          .at(0)
          .equals(<img src="Poster 1 thumb url" alt="No thumb" width="53" height="75" />)
      ).toEqual(true);

      wrapper.find(Button.Light).at(1).simulate('click');
    });

    setTimeout(() => {
      console.log(wrapper.find('img').at(0).debug());
      expect(
        wrapper
          .find('img')
          .at(0)
          .equals(<img src="Poster 2 thumb url" alt="No thumb" width="53" height="75" />)
      ).toEqual(true);
      done();
    });
  });

  test('ProjectRanking rankUp works as expected', (done) => {
    const wrapper = shallow(<ProjectRanking />);

    setTimeout(() => {
      expect(
        wrapper
          .find('img')
          .at(0)
          .equals(<img src="Poster 1 thumb url" alt="No thumb" width="53" height="75" />)
      ).toEqual(true);

      wrapper.find(Button.Light).at(2).simulate('click');
    });

    setTimeout(() => {
      console.log(wrapper.find('img').at(0).debug());
      expect(
        wrapper
          .find('img')
          .at(0)
          .equals(<img src="Poster 2 thumb url" alt="No thumb" width="53" height="75" />)
      ).toEqual(true);
      done();
    });
  });
});
