import React from 'react';
import { Tabs, Input, Select } from 'antd';

const { TabPane } = Tabs;
const { Option } = Select;

const initialPanes = [
    { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
    { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
    {
        title: 'Tab 3',
        content: 'Content of Tab 3',
        key: '3'
    },
];

class Ant extends React.Component {
    newTabIndex = 0;

    state = {
        activeKey: initialPanes[0].key,
        panes: initialPanes,
        newTitle: '1',
        newDesc: '2',
        tabSize: 'default',
        tabPosition: 'top'
    };

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action, a, b) => {
        this[action](targetKey, a, b);
    };

    add = (a, b) => {

        const { panes, newTitle, newDesc } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: newTitle, content: newDesc, key: activeKey });
        this.setState({
            panes: newPanes,
            activeKey,
        });
    };

    remove = targetKey => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        this.setState({
            panes: newPanes,
            activeKey: newActiveKey,
        });
    };

    titleChange = (e) => {
        this.setState({ newTitle: e.target.value })
    }
    descChange = (e) => {
        this.setState({ newDesc: e.target.value })
    }

    tabSize = (value) => {
        this.setState({ tabSize: value })
    }
    tabPos = (value) =>{
        this.setState({ tabPosition: value })
    }

    disable = (targetKey) => {
        console.log(targetKey)
        const { panes, activeKey } = this.state;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                pane['closable'] = false
            }
        });

        this.setState({
            panes: panes
        });
    }

    render() {
        const { panes, activeKey, tabSize, tabPosition } = this.state;
        return (
            <>
                <Input placeholder="Заголовок" onChange={this.titleChange} /> <Input placeholder="Конент" onChange={this.descChange} />
                <Tabs
                    type="editable-card"
                    onChange={this.onChange}
                    activeKey={activeKey}
                    onEdit={this.onEdit}
                    size={tabSize}
                    tabPosition={tabPosition}
                    onTabClick={this.disable} 
                >
                    {panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                            {pane.content}
                        </TabPane>
                    ))}
                </Tabs>



                <Select defaultValue="default" style={{ width: 120 }} onChange={this.tabSize}>
                    <Option value="small">Маленькие</Option>
                    <Option value="large">Большие</Option>
                    <Option value="default">Стандартные</Option>
                </Select>


                <Select defaultValue="top" style={{ width: 120 }} onChange={this.tabPos}>
                    <Option value="bottom">Низ</Option>
                    <Option value="left">Лево</Option>
                    <Option value="right">Право</Option>
                    <Option value="top">Верх</Option>
                </Select>
            </>
        );
    }
}

export default Ant
