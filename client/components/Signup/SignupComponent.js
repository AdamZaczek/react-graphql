import { Form, FormGroup, Col, Checkbox, FormControl, ControlLabel, Button } from 'react-bootstrap';
import React from 'react';
import Page from '../Page/PageComponent';

export default class Signup extends React.Component {
  render() {
    return (
      <Page heading='Signup'>
        <Form horizontal>
          <FormGroup controlId='formHorizontalEmail'>
            <Col componentClass={ControlLabel} sm={2}>
              Email
            </Col>
            <Col sm={10}>
              <FormControl type='email' placeholder='Email' />
            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalPassword'>
            <Col componentClass={ControlLabel} sm={2}>
              Password
            </Col>
            <Col sm={10}>
              <FormControl type='password' placeholder='Password' />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type='submit'>
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Page>
    );
  }
}
