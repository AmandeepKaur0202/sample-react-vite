import React, { useState } from 'react'
import { Tabs } from 'antd';
import ItemList from '../components/ItemList'
const { TabPane } = Tabs;

const Customise: React.FC = () => {
    const tabs = [
        { tab: 'todos', key: 'todo' },
        { tab: 'posts', key: 'posts' },
      ];
    
  const [activeTabKey, setActiveTabKey] = useState<string>('todos');
  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };
return <>
 <Tabs defaultActiveKey={activeTabKey}  onChange={onTabChange}>
          <TabPane key={'todos'} tab={'todos'}>
          <ItemList type={activeTabKey}/>
          </TabPane>
          <TabPane key={'posts'} tab={'posts'}>
          <ItemList type={activeTabKey}/>
          </TabPane>
        </Tabs>
 </>

}

export default Customise
