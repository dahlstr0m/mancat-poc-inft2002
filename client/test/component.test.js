//@flow
import * as React from 'react';
import { ProjectDetails, Portfoliolisting } from '../src/components';
import { type Project, type Poster, type Thumbnails } from '../src/service';
import { shallow } from 'enzyme';
import { Form, Button, Column } from '../src/widgets';
import { NavLink } from 'react-router-dom';

//Projects
jest.mock('../src/service', () => {
  class ProjectService {
    getAll() {
      return Promise.resolve([
        {
          projectid: 1,
          title: 'title1',
          description: 'des1',
          projectDate: 162110,
          categoryId: 1,
          employerid: 1,
          active: 1,
          ranking: 10,
        },
        {
          projectid: 2,
          title: 'title2',
          description: 'des2',
          projectDate: 162111,
          categoryId: 2,
          employerid: 2,
          active: 1,
          ranking: 9,
        },
        {
          projectid: 3,
          title: 'title3',
          description: 'des3',
          projectDate: 162112,
          categoryId: 3,
          employerid: 3,
          active: 0,
          ranking: 5,
        },
      ]);
    }

    get(id: number) {
      return Promise.resolve({
        projectid: 1,
        title: 'title1',
        description: 'des1',
        projectDate: 162110,
        categoryId: 1,
        employerid: 1,
        active: 1,
        ranking: 10,
      });
    }

    create(title: string, categoryId: number, active: boolean) {
      return Promise.resolve(); // Same as: return new Promise((resolve) => resolve(4));
    }

    update(project: Project) {
      return Promise.resolve();
    }

    delete(projectid: number) {
      return Promise.resolve();
    }
  }
  return new ProjectService();
});

//POSTER
jest.mock('../src/service', () => {
  class PosterService {
    getAll() {
      return Promise.resolve([
        {
          posterid: 1,
          projectid: 1,
          description: 'post1',
          url: 'post1',
        },
        {
          posterid: 2,
          projectid: 2,
          description: 'post1',
          url: 'post2',
        },
        {
          posterid: 3,
          projectid: 1,
          description: 'post1',
          url: 'post3',
        },
      ]);
    }

    get(posterid: number) {
      return Promise.resolve({
        posterid: 1,
        projectid: 1,
        description: 'post1',
        url: 'post1',
      });
    }

    create(posterid: string, projectid: number) {
      return Promise.resolve(); // Same as: return new Promise((resolve) => resolve(4));
    }

    update(poster: Poster) {
      return Promise.resolve();
    }

    delete(posterid: number) {
      return Promise.resolve();
    }
  }
  return new PosterService();
});

//Thumbnails
jest.mock('../src/service', () => {
  class ThumbnailService {
    update(thumbnails: Thumbnails) {
      return Promise.resolve();
    }

    delete(thumbnailid: number) {
      return Promise.resolve();
    }
  }
  return new ThumbnailService();
});

//Faktiske tester
describe('Project component tests', () => {
  test('Projects draws correctly', (done) => {
    const wrapper = shallow(<ProjectDetails />);

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <NavLink to="/projects/1">title1</NavLink>,
          <NavLink to="/projects/2">title2</NavLink>,
          <NavLink to="/projects/3">title3</NavLink>,
        ])
      ).toEqual(true);
      done();
    });
  });
});

/*
describe('Task component tests', () => {
  test('TaskList draws correctly', (done) => {
    const wrapper = shallow(<TaskList />);

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <NavLink to="/tasks/1">Les leksjon</NavLink>,
          <NavLink to="/tasks/2">Møt opp på forelesning</NavLink>,
          <NavLink to="/tasks/3">Gjør øving</NavLink>,
        ])
      ).toEqual(true);
      done();
    });
  });

  test('TaskDetails draws correctly', (done) => {
    const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <Column>Les leksjon</Column>,
          <Column>Les nøye</Column>,
          // $FlowExpectedError
          <Form.Checkbox checked={true} />,
        ])
      ).toEqual(true);
      done();
    });
  });

  test('TaskDetails draws correctly (using snapshot)', (done) => {
    const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      expect(wrapper).toMatchSnapshot();
      done();
    });
  });

  test('TaskDetails correctly sets location on edit', (done) => {
    const wrapper = shallow(<TaskDetails match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <Column>Les leksjon</Column>,
          <Column>Les nøye</Column>,
          // $FlowExpectedError
          <Form.Checkbox checked={true} />,
        ])
      ).toEqual(true);

      wrapper.find(Button.Success).simulate('click');

      setTimeout(() => {
        expect(location.hash).toEqual('#/tasks/1/edit');
        done();
      });
    });
  });

  test('TaskEdit draws correctly', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          // $FlowExpectedError
          <Form.Input value="Les leksjon" />,
          // $FlowExpectedError
          <Form.TextArea value="Les nøye" />,
          // $FlowExpectedError
          <Form.Checkbox checked={true} />,
        ])
      ).toEqual(true);
      done();
    });
  });

  test('TaskEdit correctly sets location on save', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          // $FlowExpectedError
          <Form.Input value="Les leksjon" />,
          // $FlowExpectedError
          <Form.TextArea value="Les nøye" />,
          // $FlowExpectedError
          <Form.Checkbox checked={true} />,
        ])
      ).toEqual(true);

      wrapper
        .find(Form.Input)
        .simulate('change', { currentTarget: { value: 'Les leksjon igjen' } });
      // $FlowExpectedError
      expect(wrapper.containsMatchingElement(<Form.Input value="Les leksjon igjen" />)).toEqual(
        true
      );

      wrapper
        .find(Form.TextArea)
        .simulate('change', { currentTarget: { value: 'Les ekstra nøye' } });
      // $FlowExpectedError
      expect(wrapper.containsMatchingElement(<Form.TextArea value="Les ekstra nøye" />)).toEqual(
        true
      );

      wrapper.find(Button.Success).simulate('click');

      setTimeout(() => {
        expect(location.hash).toEqual('#/tasks/1');
        done();
      });
    });
  });

  test('TaskEdit correctly sets location on delete', (done) => {
    const wrapper = shallow(<TaskEdit match={{ params: { id: 1 } }} />);

    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          // $FlowExpectedError
          <Form.Input value="Les leksjon" />,
          // $FlowExpectedError
          <Form.TextArea value="Les nøye" />,
          // $FlowExpectedError
          <Form.Checkbox checked={true} />,
        ])
      ).toEqual(true);

      wrapper.find(Button.Danger).simulate('click');

      setTimeout(() => {
        expect(location.hash).toEqual('#/tasks');
        done();
      });
    });
  });

  test('TaskNew correctly sets location on create', (done) => {
    const wrapper = shallow(<TaskNew />);

    wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Kaffepause' } });
    // $FlowExpectedError
    expect(wrapper.containsMatchingElement(<Form.Input value="Kaffepause" />)).toEqual(true);

    wrapper.find(Button.Success).simulate('click');
    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/4');
      done();
    });
  });
});
*/
