import React from 'react';
import { Container, Form, Button } from 'semantic-ui-react';


const TakeExam = () => (
  <Container>
    <Form>
      <Form.Input
        name="secretKey"
        label="Exam secret key"
      />
      <Button type="button" positive>Load exam</Button>
    </Form>

  </Container>
);

export default TakeExam;
