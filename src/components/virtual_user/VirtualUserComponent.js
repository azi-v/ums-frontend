import { Form, Input, Button, Select, Switch, Upload } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

import './VirtualUserComponent';

const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export const VirtualUserForm = () => {
    const [form] = Form.useForm();

    const onGenderChange = (value) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({
                    note: 'Hi, man!',
                });
                return;

            case 'female':
                form.setFieldsValue({
                    note: 'Hi, lady!',
                });
                return;

            case 'other':
                form.setFieldsValue({
                    note: 'Hi there!',
                });
        }
    };

    const onFinish = (values) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            {/* <Form.Item>
                <Alert message="虚拟号是使用物联网号段、未启用的手机号段手机号创建的一亩田账号;为了避免人员变动带来的损失而创建的;支撑各种业务中对号码的需求;" type="success" />
            </Form.Item> */}
            <Form.Item
                name="note"
                label="用途说明:"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item
                name="note"
                label="tapd地址:"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="note"
                label="申请人姓名:"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="note"
                label="申请人手机:"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="note"
                label="账号昵称:"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="upload"
                label="虚拟账号头像:"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                    {
                        required: true,
                    },
                ]}
                extra="图片名称"
            >
                <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item
                name="note"
                label="账号类型:"
                rules={[
                    {
                        required: true,
                        message: 'Please select your country!',
                    },
                ]}
            >
                <Select placeholder="请选择虚拟账号类型">
                    <Option value="normal">普通虚拟账号</Option>
                    <Option value="market">营销号</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="note"
                label="APP业务线:"
                rules={[
                    {
                        required: true,
                        message: '请选择APP业务线!',
                    },
                ]}
            >
                <Select placeholder="请选择APP业务线">
                    <Option value="normal">一亩田</Option>
                    <Option value="market">豆牛</Option>
                </Select>
            </Form.Item>


            <Form.Item label="可访问名片:" valuePropName="checked">
                <Switch />
            </Form.Item>


            <Form.Item label="可被关注:" valuePropName="checked">
                <Switch />
            </Form.Item>



            <Form.Item label="可打电话:" valuePropName="checked">
                <Switch />
            </Form.Item>



            <Form.Item label="可聊天:" valuePropName="checked">
                <Switch />
            </Form.Item>



            <Form.Item label="实人认证:" valuePropName="checked">
                <Switch />
            </Form.Item>



            <Form.Item label="官方标签:" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item
                name="note"
                label="部门审批人:"
                rules={[
                    {
                        required: true,
                        message: 'Please select your country!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="note"
                label="选择执行人:"
                rules={[
                    {
                        required: true,
                        message: 'Please select your country!',
                    },
                ]}
            >
                <Input />
            </Form.Item>



            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    );
};