/**
 * Component which dynamically selects a views/zesty component based on the URL
 */
import React from 'react';
import * as Zesty from '../views/zesty';

import dynamic from 'next/dynamic';

const LiveEditor = dynamic(() => import('components/globals/LiveEditor'), {
  ssr: false,
});
const ErrorPage = dynamic(() => import('../pages/_error'));
const AutoLayoutComponent = dynamic(() =>
  import('../views/zesty/AutoLayoutComponent'),
);

export function ZestyView(props) {
  if (props.content.error) {
    return <ErrorPage statusCode={404} />;
  }

  /**
   * @description check if layout is active and has content in the cms
   * @returns boolean
   * @true  - AutolayoutComponent will be used
   * @false - Zesty -> view component will be used, sync must be run
   */

  const useAutoLayoutCheck = () => {
    /**
     * Note!!! This page LandingPage2023 is exception, regardles of state it will use the default
     * component from > views > landingPage, this page can use both autolayout and manually defined component
     */
    if (props.content.meta.model_alternate_name === 'LandingPages2023')
      return false;

    // Layout is not active
    if (!props.content.meta.layout) return false;

    // Layout is active but no json object
    if (props.content.meta.layout?.json === null) return false;

    // Layout is active but no components selected
    if (
      JSON.stringify(
        props.content.meta.layout?.json['layout:root:column:0']?.children,
      ) === '{}'
    ) {
      return false;
    }

    // return only true if the layout is active and has components
    return true;
  };

  /**
   * 1.) If layouts has content inside the cms always default to autolayout component
   * 2.) If layouts don't have content inside cms it renders the component from zesty > view
   * npm run sync must be run! otherwise it default back to auto layout component
   */

  console.log(props);

  const Component = useAutoLayoutCheck()
    ? AutoLayoutComponent
    : Zesty[props.content.meta.model_alternate_name];

  // outside the component near imports

  // inside the component's function just before the return statement
  return (
    <>
      {props.content.zestyProductionMode !== true && (
        <LiveEditor data={props.content} />
      )}
      <Component content={props.content} />
    </>
  );
}
