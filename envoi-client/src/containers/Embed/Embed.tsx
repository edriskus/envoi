import React from "react";
import Runner from "../Runner/Runner";

import { RouteComponentProps, withRouter } from "react-router";

type IEmbedProps = RouteComponentProps<{ id: string }>;

export class Embed extends React.PureComponent<IEmbedProps> {
  render() {
    const { match } = this.props;
    const { params } = match;
    return (
      <Runner 
        gpu={false}
        finished={false}
        jobId={params.id}
        autoStart={true}
      />
    );
  }
}

export default withRouter(Embed);