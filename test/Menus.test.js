import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {expect} from 'chai';
import Menus from '../src/index';

describe('Menus 组件测试', function() {
	
	it('Menus exist', function() {
		let menus = shallow(<Menus/>);
		expect(menus.hasClass('u-menu')).to.equal(true);
	})
})