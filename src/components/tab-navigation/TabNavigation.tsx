import styles from './tabNavigation.module.scss';
import classNames from 'classnames';

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={classNames(styles.tabItem, {
            [styles.activeTab]: activeTab === tab,
          })}
          onClick={() => onTabChange(tab)}>
          {tab}
        </div>
      ))}
    </div>
  );
}

export default TabNavigation;
