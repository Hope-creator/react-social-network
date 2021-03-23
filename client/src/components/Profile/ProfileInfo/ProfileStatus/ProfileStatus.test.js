import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe('ProfileStatus component', () => {
    test('Status from props should be in state', () => {
        const component = create(<ProfileStatus status='status is changed' />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('status is changed')
    });
    test('After creation <span> should be displayed with correct status', () => {
        const component = create(<ProfileStatus status='status is changed' />);
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children[0]).toBe('status is changed')
    });
    test('<input> should be displayed in ediiMode instead of <span>', () => {
        const component = create(<ProfileStatus status='status is changed' />);
        const root = component.root;
        let span = root.findByType('span')
        span.props.onDoubleClick()
        let input = root.findByType('input')
        expect(input.props.value).toBe('status is changed')
    });
    test('<input> should be displayed in ediiMode instead of <span>', () => {
        const mockCallback = jest.fn(x => 42 + x);
        const component = create(<ProfileStatus status='status is changed' updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});