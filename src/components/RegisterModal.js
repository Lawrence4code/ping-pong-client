import React, { Component } from 'react';
import { Modal, Form, Icon, Input, Button } from 'antd';
import axios from 'axios';

// to show field error and disable button
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class RegisterModal extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        errors: []
    };

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmitForRegister = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                axios.post('http://localhost:8080/register', {
                    "username": values.name,
                    "email": values.email,
                    "password": values.password,
                })
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        if (err.response) {
                            console.log(err.response)
                            this.setState(() => {
                                return { errors: [...err.response.data] }
                            })
                        }

                    })
                console.log(this.state);
            }
            this.props.form.resetFields()
            this.props.hideRegisterModal(false);
        });
    };

    onNameInputChange = e => {
        const { value } = e.target;
        console.log(value)
        this.setState(() => {
            return { name: value }
        })
    }

    onEmailInputChange = e => {
        const { value } = e.target;
        console.log(value)
        this.setState(() => {
            return { email: value }
        })
    }
    onPasswordInputChange = e => {
        const { value } = e.target;
        console.log(value)
        this.setState(() => {
            return { password: value }
        })
    }

    handleCancel = () => {
        this.setState(() => {
            return {
                username: '',
                email: '',
                password: '',
            };
        })
        this.props.form.resetFields();
        this.props.hideRegisterModal(false);
    };


    render() {
        console.log(this.props)
        const { registerModalVisible } = this.props;
        const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;
        const usernameError = isFieldTouched('name') && getFieldError('name');
        const emailError = isFieldTouched('email') && getFieldError('email');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div>
                <Modal
                    visible={registerModalVisible}
                    title="Please fill up below details to register with us."
                    onCancel={this.handleCancel}
                    footer={null}
                    style={{ top: 200 }}
                >
                    <Form onSubmit={this.handleSubmitForRegister} className="login-form">
                        <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Please enter your name.' }, { min: 4, message: 'Username must of atleast 4 characters.' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Name"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
                            {getFieldDecorator('email', {
                                rules: [{ type: "email", required: true, message: 'Please input your Email address!' }],
                            })(
                                <Input
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Email address"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' },
                                { min: 6, message: 'Password must atleast 6 characters.' },
                                { max: 25, message: 'Password cannot exceed 25 characters.' }],
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())} className="register-form-button">Register</Button>
                        <br />
                        <br />
                        {/* <p>Already registered link <span>here</span> to login.</p> */}
                    </Form>
                </Modal>
            </div>
        )
    }
}

const WrappedRegisterModal = Form.create({ name: 'normal_register' })(RegisterModal);

export default WrappedRegisterModal;