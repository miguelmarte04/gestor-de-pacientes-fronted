import React, { useEffect, useState } from 'react'
import CustomCol from '../components/CustomCol'
import CustomLayoutBoxShadow from '../components/CustomLayoutBoxShadow'
import CustomSpin from '../components/CustomSpin'
import CustomTabs from '../components/CustomTabs'
import Permissions from '../components/Permissions'
import { TabConfig } from '../constants/interfaces'
import CustomTabPane from '../components/CustomTabPane'
import { RECORD_PERMIT_OR_LICENSE } from '../constants/Routes'
import { useNavigate } from 'react-router-dom'
import Licenses from '../components/Licenses'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getDepartments, getParametros } from '../slicers/general'
const PermitOrLicense = (): React.ReactElement => {
  const [activeTab, setActiveTab] = useState<string>('0')
  const history = useNavigate()
  const dispatch = useAppDispatch()
  const { fetchingFromEmployee } = useAppSelector((state) => state.employee)
  useEffect(() => {
    dispatch(
      getParametros({
        condition: {
          id_actividad: '1-2',
        },
      })
    )
    dispatch(getDepartments({}))
  }, [])

  const tabsOptions: TabConfig[] = [
    {
      key: '0',
      title: 'Permisos',
      node: <Permissions />,
      path: '/permisos',
    },
    {
      key: '1',
      title: 'Licencias',
      node: <Licenses />,
      path: '/licencias',
    },
  ]
  const handleOnTabClick = (key: string): void => {
    const currentTab = tabsOptions?.find((item) => item.key === key)

    if (key !== '0' && currentTab) {
      history(`${RECORD_PERMIT_OR_LICENSE}?tab=${currentTab.path}`)
      sessionStorage.setItem('tab', key)
    } else if (key === '0') {
      history(RECORD_PERMIT_OR_LICENSE)
    }

    setActiveTab(key)
  }
  return (
    <CustomSpin spinning={fetchingFromEmployee}>
      <CustomLayoutBoxShadow>
        <CustomCol xs={24}>
          <CustomTabs
            tabPosition={'left'}
            defaultActiveKey={sessionStorage.getItem('tab') ?? '0'}
            activeKey={activeTab}
            onTabClick={handleOnTabClick}
          >
            {tabsOptions?.map((tab) => (
              <CustomTabPane key={tab.key} tab={tab.title}>
                {tab.node}
              </CustomTabPane>
            ))}
          </CustomTabs>
        </CustomCol>
      </CustomLayoutBoxShadow>
    </CustomSpin>
  )
}

export default PermitOrLicense
