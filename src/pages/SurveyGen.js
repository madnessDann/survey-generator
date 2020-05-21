import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';
import {
  Radio,
  Form,
  Input,
  InputNumber,
  Button,
  Checkbox
} from 'antd';
import "antd/dist/antd.css";
const axios = require('axios');
const { TextArea  } = Input;
const requiredMessage = 'Field required'

const Components = {
  input: (name, label, required) => (
    <Form.Item
      key={name}
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: requiredMessage
        },
      ]}
    >
      <Input />
    </Form.Item>
  ),
  number: (name, label, required) => (
    <Form.Item
      key={name}
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: requiredMessage
        },
      ]}
    >
      <InputNumber />
    </Form.Item>
  ),
  textArea: (name, label, required) => (
    <Form.Item
      key={name}
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: requiredMessage
        },
      ]}
    >
      <TextArea
        placeholder="Controlled autosize"
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
    </Form.Item>
  ),
  multioption: (name, label, required, options) => (
    <Form.Item
      label={label}
      key={name}
      name={name}
      rules={[
        {
          required: required,
          message: requiredMessage
        },
      ]}
    >
      <Radio.Group>
        {options.map(option => (
          <Radio.Button key={option.value} value={option.value}>{option.label}</Radio.Button>
        ))}
      </Radio.Group>
    </Form.Item>
  ),
  multivalue: (name, label, required, options) => (
    <Form.Item
      label={label}
      name={name}
      key={name}
      rules={[
        {
          required: required,
          message: requiredMessage
        },
      ]}
    >
      <Checkbox.Group
        options={options}
      />
    </Form.Item>
  )
}

const SurveyGen = _ => {
  const [surveyData, setSurveyData] = useState(null)

  useEffect(() => {
    axios.get('https://pramirez.s3.amazonaws.com/survey-data.json')
      .then(data => setSurveyData(data.data))
  }, [])

  const onFinish = values => {
    axios.post('http://dummyserver.com/values', {
      responses: {
        ...values
      }
    })
    console.log(values)
  }

  return surveyData ? (
    <Row>
      <Col span={6} offset={6}>
        <h1>{surveyData.title}</h1>
        <p>{surveyData.description}</p>
        <Form
          name="basic"
          layout='vertical'
          onFinish={onFinish}
        >
          {surveyData.questions.map(question => (
            Components[question.type](question.id, question.label, question.required, question.options)
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  ) : null
}

export default SurveyGen
