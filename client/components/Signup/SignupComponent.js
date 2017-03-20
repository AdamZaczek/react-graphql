import { Form, FormGroup, Col, Checkbox, FormControl, ControlLabel, Button } from 'react-bootstrap';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Page from '../Page/PageComponent';

const SignUp = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Page heading='Signup'>
    <Form onSubmit={onSubmit} horizontal>

      {errors.summary && <p className='error-message'>{errors.summary}</p>}

      <FormGroup controlId='formHorizontalEmail'>
        <Col componentClass={ControlLabel} sm={2}>
          Email
        </Col>
        <Col sm={10}>
          <FormControl type='email' placeholder='Email' value={user.email} onChange={onChange} />
        </Col>
      </FormGroup>

      <FormGroup controlId='formHorizontalPassword'>
        <Col componentClass={ControlLabel} sm={2}>
          Password
        </Col>
        <Col sm={10}>
          <FormControl type='password' placeholder='Password' value={user.password} onChange={onChange} />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={1}>
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
    <Col smOffset={2} sm={10}>
      Already have an account? You can log in <Link to='/login'>here</Link>
    </Col>
  </Page>
);

SignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUp;
