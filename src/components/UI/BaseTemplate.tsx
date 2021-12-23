import { AppBar } from '@material-ui/core';
import React, { ReactElement, ReactNode } from 'react';
import Header from "./Header"

type BaseTemplateProps = {
  children: ReactElement | ReactNode | null;
};

const BaseTemplate = ({ children }: BaseTemplateProps) => {
    return (<div>
    <Header/>
        {children}
    </div>
  );
};

export default BaseTemplate;
