import { Form, FormGroup, Col, Checkbox, FormControl, ControlLabel, Button } from 'react-bootstrap';
import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
import Page from '../Page/PageComponent';

//   <Card className="container">
//     <form action="/" onSubmit={onSubmit}>
//       <h2 className="card-heading">Sign Up</h2>
//
//       {errors.summary && <p className="error-message">{errors.summary}</p>}
//
//       <div className="field-line">
//         <TextField
//           floatingLabelText="Name"
//           name="name"
//           errorText={errors.name}
//           onChange={onChange}
//           value={user.name}
//         />
//       </div>
//
//       <div className="field-line">
//         <TextField
//           floatingLabelText="Email"
//           name="email"
//           errorText={errors.email}
//           onChange={onChange}
//           value={user.email}
//         />
//       </div>
//
//       <div className="field-line">
//         <TextField
//           floatingLabelText="Password"
//           type="password"
//           name="password"
//           onChange={onChange}
//           errorText={errors.password}
//           value={user.password}
//         />
//       </div>
//
//       <div className="button-line">
//         <RaisedButton type="submit" label="Create New Account" primary />
//       </div>
//
//       <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
//     </form>
//   </Card>
// );
//
//
// export default SignUpForm;

const SignUp = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <Page heading='Signup'>
    <Form horizontal onSubmit={onSubmit}>

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

SignUp.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUp;
