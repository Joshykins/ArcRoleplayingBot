import React from 'react';
import './home.scss';
import Test from '../../components/counterExample/CounterExample';
import CounterExample from '../../components/counterExample/CounterExample';
import { Button, ButtonTypes } from '../../components/button/Button';


export interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  return (
    <section className="homePage container tileBg tileShadow">
      <h2>Arc Roleplaying</h2>
      <h1>A Discord Bot for <span>Roleplay</span></h1>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
      <Button type={ButtonTypes.boring}>boring</Button>
      <Button type={ButtonTypes.success}>success</Button>
      <Button type={ButtonTypes.failure}>failure</Button>

      <Button type={ButtonTypes.boring} disabled={true}>boring</Button>
      <Button type={ButtonTypes.success} disabled={true}>success</Button>
      <Button type={ButtonTypes.failure} disabled={true}>failure</Button>
    </section>
  );
};

export default Home;
