import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as actions from '../../actions';

import { Link } from 'react-router';

class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchQuestionaires();
  }
  deleteItem(id) {
    this.props.deleteQuestionaire(id);
  }
  renderQuestionaire() {
    return this.props.questionaires.map((item, key) => {
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>{item.name}</td>
          <td>
            <div className="dropdown btn-group">
          	   <button className="btn btn-default btn-xs dropdown-toggle" type="button" data-toggle="dropdown" id={`dropdown${key}`}>
          		   <i className="fa fa-gears nudge-left"></i><span className="caret"></span>
          			</button>
          			<ul className="dropdown-menu text-left pull-right" aria-labelledby={`dropdown${key}`}>
          			   <li><Link to={`/questionaire/${item._id}`}><i className="fa fa-pencil fa-fw"></i> Edit</Link></li>
                   <li><a href="#" onClick={this.deleteItem.bind(this, item._id)}><i className="fa fa-trash fa-fw"></i> Delete</a></li>
                </ul>
          		</div>
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <div>
        <div className="btn-toolbar text-xs-right">
          <Link to="/questionaire/new" className="btn btn-primary">
            <i className="fa fa-plus"></i> Create Questionaire
          </Link>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {this.renderQuestionaire()}
          </tbody>
        </table>
      </div>
    );
  }
};

function mapStateToProps(state) {
  console.log("mapStateToProps tate", state);
  return { questionaires: state.questionaire.questionaires };
}


export default connect(mapStateToProps, actions)(Dashboard);
