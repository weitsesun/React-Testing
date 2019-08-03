import React from 'react';
import App from './App';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

/**
 * function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {props} props - Component props specific to this setup.
 * @param {obj} state 
 * @returns {shallowWrapper}
 */

const setup = (props={}, state=null) => {
  const wrapper = shallow(<App {...props} />);
  if(state) wrapper.setState(state);
  return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the giving data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme ShallowWrapper for search within.
 * @param {string} val - value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test('renders without crashing', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});
test('render increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});
test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});
test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});
test('clicking button increments counter display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  //find button
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');

  //update the Wrapper
  wrapper.update();

  //find display and check its value
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});

describe('\n - testing decremet button', () => {
  test('decrement button should be rendered', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'decrement-button');
    expect(button.length).toBe(1);
  });
  test('should minus 1 if the decrement button is clicked', () => {
    const counter = 10;
    const wrapper = setup(null, {counter});
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter - 1);
  });
  test('should not have a value that is less than zero', () => {
    const counter = 0;
    const wrapper = setup(null, {counter});
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(0);
  });
  test('should render error message', () => {
    const counter = 0;
    const wrapper = setup(null, {counter});
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    wrapper.update();
    const errorMessage = findByTestAttr(wrapper, 'error-message');
    expect(errorMessage.length).toBe(1);
  });
  test('should prevent error on increment button', () => {
    const counter = 0;
    const wrapper = setup(null, {counter});

    //click decrement button once, the counter should maintain 0
    const deButton = findByTestAttr(wrapper, 'decrement-button');
    deButton.simulate('click');

    //click the increment button, the counter value should be 1
    const inButton = findByTestAttr(wrapper, 'increment-button');
    inButton.simulate('click');

    wrapper.update();
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(1);
  });

  test('should hide error message while counter is greater than zero', () => {
    const counter = 0;
    const wrapper = setup(null, {counter});
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');
    wrapper.update();
    const errorMessage = findByTestAttr(wrapper, 'error-message');
    expect(errorMessage.length).toBe(0);
  });
})