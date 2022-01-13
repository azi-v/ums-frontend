import {
    Form, Input, Button, Select, Switch, Upload, Layout, Menu,
} from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { UploadImageAvatarURL } from '../../config/domain';
import './VirtualUserComponent.css';

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const { Option } = Select;
const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 5,
        span: 16,
    },
};

// 部门审批人名单 
// TODO: 从接口拉取
const approval_people = [
    // label为员工名称 value为员工id
    { label: '付煦', value: '1' },
    { label: '张瑞焱', value: '2' },
    { label: '贾睿', value: '3' },
    { label: '邓旭', value: '4' },
    { label: '肖潇', value: '5' },
    { label: '周宇珠', value: '6' },
];

// 工单执行人名单
// TODO: 从接口拉取
const executor = [
    { label: '陈明', value: '1' },
    { label: '杨浩', value: '2' },
    { label: '刘金花', value: '3' },
    { label: '付煦', value: '4' },
]

export const VirtualUserForm = () => {
    // 表单提交数据
    const formUploadData = {
        'use_direction': '',
        'project_address': '',
        'applicant_name': '',
        'applicant_phone': '',
        'virtual_user_name': '',
        'virtual_user_avatar': '',
        'virtual_user_type': '',
        'app_business_type': '',
        'allow_been_view_user_card': false,
        'allow_been_fllowed': false,
        'allow_to_call_other_user': false,
        'allow_to_chat_with_other_user': false,
        'is_account_verification': false,
        'is_officall_account': false,
        'approval_people': '',
        'executor': '',
    }

    const [form] = Form.useForm();

    // 处理下拉选框选择改变后的逻辑
    const handleChange = () => {
        form.setFieldsValue({ sights: [] });
    };

    const onFinish = (values) => {
        values['virtual_user_avatar'] = formUploadData['virtual_user_avatar'];
        values['allow_been_view_user_card'] = formUploadData['allow_been_view_user_card'];
        values['allow_been_fllowed'] = formUploadData['allow_been_fllowed'];
        values['allow_to_call_other_user'] = formUploadData['allow_to_call_other_user'];
        values['allow_to_chat_with_other_user'] = formUploadData['allow_to_chat_with_other_user'];
        values['is_account_verification'] = formUploadData['is_account_verification'];
        values['is_officall_account'] = formUploadData['is_officall_account'];
        console.log('values:', values);
        // 提交json请求到服务器
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
        fetch('http://localhost:8082/virtual/user/submit', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // 判断提交结果
                if (data.code !== 0) {
                    // 提交失败，弹窗提醒失败原因
                } else {
                    // 提交成功
                    // 请求新建工单接口
                    // 判断工单提交成功信息
                    // 不成功提示工单提交错误信息
                    // 成功返回提交成功信息
                }
            }).catch((error) => {
                console.error('Error:', error);
            });;

    };

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }
        console.log('normFile ImgUrl:', e['file'])
        return e && e.fileList;
    };

    const handleAvatarFileChange = e => {
        console.log('e:', e);
        if (e.file.status === 'done') {
            console.log('e.response:', e.file.response);
            const res = e.file.response;
            if (res.code !== 0) {
                // 表单提交失败，页面重定向提示失败
            } else {
                const ImgUrl = e.file.response.data.ImgUrl;
                console.log('ImgUrl:', ImgUrl);
                formUploadData['virtual_user_avatar'] = ImgUrl;
                // 提交成功
            }

        }
    };

    const beforeUploadAvatarFile = e => {
        console.log('before e:', e)
    }

    const SwitchBeenAllowViewUserCard = e => {
        console.log('SwitchAllowViewUserCard:', e)
        formUploadData['allow_been_view_user_card'] = e
    }
    const SwitchBeenFollowed = e => {
        console.log('SwitchBeenFollowed:', e)
        formUploadData['allow_been_fllowed'] = e
    }
    const SwitchToCallOtherUser = e => {
        console.log('SwitchToCallOtherUser:', e)
        formUploadData['allow_to_call_other_user'] = e
    }
    const SwitchToChatWithOtherUser = e => {
        console.log('SwitchToChatWithOtherUser:', e)
        formUploadData['allow_to_chat_with_other_user'] = e
    }
    const SwitchIsAccountVerfication = e => {
        console.log('SwitchIsAccountVerfication:', e)
        formUploadData['is_account_verification'] = e
    }
    const SwitchIsOfficallAccount = e => {
        console.log('SwitchIsOfficallAccount:', e)
        formUploadData['is_officall_account'] = e
    }

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="use_direction" label="用途说明:" rules={[{ required: true, },]} >
                <Input.TextArea showCount maxLength={100} />
            </Form.Item>

            <Form.Item name="project_address" label="项目地址(tapd):" rules={[{ required: false, },]} >
                <Input />
            </Form.Item>

            <Form.Item name="applicant_name" label="申请人姓名:" rules={[{ required: true, },]} >
                <Input />
            </Form.Item>

            <Form.Item name="applicant_phone" label="申请人手机:" rules={[{ required: true, },]} >
                <Input />
            </Form.Item>

            <Form.Item name="virtual_user_name" label="账号昵称:" rules={[{ required: true, },]} >
                <Input />
            </Form.Item>

            <Form.Item
                name="virtual_user_avatar"
                label="虚拟账号头像:"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, },]}
            >
                <Upload
                    name="avator"
                    accept='image/*'
                    action={UploadImageAvatarURL}
                    listType="picture"
                    maxCount={1}
                    beforeUpload={beforeUploadAvatarFile}
                    onChange={handleAvatarFileChange}
                >
                    <Button icon={<UploadOutlined />}>点击上传图片</Button>
                </Upload>
            </Form.Item>

            <Form.Item name="virtual_user_type" label="账号类型:" rules={[{ required: true, message: 'Please select your country!', },]} >
                <Select placeholder="请选择虚拟账号类型">
                    <Option value="normal">普通虚拟账号</Option>
                    <Option value="market">营销号</Option>
                </Select>
            </Form.Item>

            <Form.Item name="app_business_type" label="APP业务线:" rules={[{ required: true, message: '请选择APP业务线!', },]} >
                <Select placeholder="请选择APP业务线">
                    <Option value="ymt">一亩田</Option>
                    <Option value="douniu">豆牛</Option>
                </Select>
            </Form.Item>

            <Form.Item label="可访问名片:" valuePropName="allow_been_view_user_card">
                <Switch onChange={SwitchBeenAllowViewUserCard} />
            </Form.Item>

            <Form.Item label="可被关注:" valuePropName="allow_been_fllowed">
                <Switch onChange={SwitchBeenFollowed} />
            </Form.Item>

            <Form.Item label="可打电话:" valuePropName="allow_to_call_other_user">
                <Switch onChange={SwitchToCallOtherUser} />
            </Form.Item>

            <Form.Item label="可聊天:" valuePropName="allow_to_chat_with_other_user">
                <Switch onChange={SwitchToChatWithOtherUser} />
            </Form.Item>

            <Form.Item label="实人认证:" valuePropName="is_account_verification">
                <Switch onChange={SwitchIsAccountVerfication} />
            </Form.Item>

            <Form.Item label="官方标签:" valuePropName="is_officall_account" >
                <Switch onChange={SwitchIsOfficallAccount} />
            </Form.Item>

            <Form.Item name="approval_people" label="部门审批人:" rules={[{ required: true, message: '请选择同部门审批人' }]}>
                <Select options={approval_people} onChange={handleChange} />
            </Form.Item>

            <Form.Item name="executor" label="选择执行人:" rules={[{ required: false, message: '优先选择陈明' }]}>
                <Select options={executor} onChange={handleChange} />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    提交申请
                </Button>
            </Form.Item>
        </Form>
    );
};

export const VirtualUserpage = () => {
    return (
        <Layout>
            <Content style={{ padding: '0 50px' }}>
                <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                    <Sider className="site-layout-background" width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['2']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="用户添加">
                                <Menu.Item key="1">虚拟账号申请</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }} id='SiderContent'>
                        <VirtualUserForm></VirtualUserForm>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    )
}