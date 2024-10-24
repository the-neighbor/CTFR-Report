import React, { useEffect, useState } from 'react';
import Header, { TestType } from '../components/Header';
import UnitTests from './UnitTests';
import IntegrationTests from './IntegrationTests';
import { TestData } from '../interfaces';


const emptyTestData: TestData = {
  results: {
    tool: {
      name: '',
      version: undefined,
      extra: undefined
    },
    summary: {
      tests: 0,
      passed: 0,
      failed: 0,
      skipped: 0,
      pending: 0,
      other: 0,
      suites: undefined,
      start: 0,
      stop: 0,
      extra: undefined
    },
    tests: [],
    environment: undefined,
    extra: undefined
  }
}

interface BranchPageProps {
  branchName: string;
}

const BranchPage: React.FC<BranchPageProps> = ({ branchName }) => {
  const [selectedTab, setSelectedTab] = useState('unit');
  const [unitTestData, setUnitTestData] = useState<TestData>(emptyTestData);
  const [integrationTestData, setIntegrationTestData] = useState<TestData>(emptyTestData);
  //read in the json file and set the state
  useEffect(() => {
    fetch(`./artifacts/${branchName}/unitTestData.json`)
      .then(response => response.json())
      .then(data => setUnitTestData(data))
    fetch(`./artifacts/${branchName}/integrationTestData.json`)
      .then(response => response.json())
      .then(data => setIntegrationTestData(data))
   }, [selectedTab])

  return (
    <div className="Branch">
      <Header initialTab={selectedTab as TestType} onTabChange={setSelectedTab}  />
      {selectedTab === 'unit' && <UnitTests />}
      {selectedTab === 'integration' && <IntegrationTests testData={integrationTestData}/>}
    </div>
  );
}

export default BranchPage;