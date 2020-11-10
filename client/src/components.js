// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card, Row, Column, Form, Button, NavBar, PortfolioCard, ProjectCard, PosterCard } from './widgets';
import { NavLink } from 'react-router-dom';
import projectservice, { type Project } from './service';
import thumbnailservice, { type Thumbnails } from './service';
import posterservice, { type Poster } from './service';
import { createHashHistory } from 'history';

//Just for devpurposes
import {thumbnailsDev, projectsDev, postersDev, projectCategoriesDev, projectEmployerDev} from './DevArray';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


/**
 * Renders portfolio list.
 */
export class Portfoliolisting extends Component {
    allProjects: Project[] = [];
    allPosters:  Poster[] = [];
  
    render() {
      return (
        <>
            {this.allProjects
            .filter((pj) => pj.active === true)                   // Filter to ensure only Active projects to be displayed
            .sort((pjA,pjB) => pjA.ranking - pjB.ranking)         // Sorting to display by asc ranking
            .map((pj) => (                                        // Maping to display all left projects with PortfolioCard widget & fetching correct corresponding thumbnail for url attrib.
              <PortfolioCard 
                  projectid = {pj.projectid}
                  title = {pj.title}
                  link = {'/project/' + pj.projectid}
                  imageurl = {
                      this.allPosters.find(p => p.projectid === pj.projectid).url
                    } 
              >
                  {'ingen data'}
              </PortfolioCard>
            ))}
        </>
        
      );
    }
    mounted() {
      // ProjectService
      //   .getAll()
      //   .then((pjarray) => (this.allProjects = pjarray))
      //   .catch((error: Error) => Alert.danger('Error getting projects: ' + error.message));
      // PosterService
      //   .getAll()
      //   .then((parray) => (this.allPosters = parray))
      //   .catch((error: Error) => Alert.danger('Error getting posters: ' + error.message));


      /**
      * Dev-parsing of data
      */
      this.allProjects  = projectsDev;
      this.allPosters   = postersDev;
    }
  }

/**
 * Renders project details.
 */
export class ProjectDetails extends Component<{ match: { params: { id: number } } }> {
//task: Task = { id: 0, title: '', done: false };
   pj: Project = {projectid: 0, title: '', description : '', projectDate: 0, categoryId: 0, employerid: 0, active: false, ranking: 0};
   allPosters: Poster[]= [];
   allThumbnails: Thumbnails[] = [];
   allCategorys = {categoryId: 0, categoryname: ''};
   allEmployers = {employerId: 0, employername: ''};


  render() {
    return (
      <>
        <ProjectCard
          projectid = {this.pj.projectid}
          title = {this.pj.title}
          projectdescription = {this.pj.description}
          projectdate = {this.pj.projectDate}
          category = {this.allCategorys.categoryname}
          employer = {this.allEmployers.employername}
        >
          {
            this.allPosters
            .filter(p => p.projectid == this.pj.projectid)
            .map(p => (                                        // Maping to display all left projects with PosterCard widget & fetching correct corresponding thumbnail for url attrib.
              <PosterCard 
                  posterId = {p.posterid} 
                  posterDescription = {p.description}
                  posterUrl = {p.url}
                  posterThumbnailUrl = {
                    this.allThumbnails
                    .filter(t => t.posterid == p.posterid)
                    .map((t) => (t.url))
                  } 
              >
                  {'ingen data'}
              </PosterCard>
            )
            )}
        </ProjectCard>
        
      </>
      
    );
  }
  mounted() {
  // Services
  // ProjectService
  //   .get(this.props.match.params.id)
  //   .then((pj) => (this.pj = pj))
  //   .catch((error: Error) => Alert.danger('Error getting project: ' + error.message));
  // ThumbnailService
  //   .getAll()
  //   .then((tarray) => (this.allThumbnails = tarray))
  //   .catch((error: Error) => Alert.danger('Error getting thumbnails: ' + error.message));
  // PosterService
  //   .getAll()
  //   .then((parray) => (this.allPosters = parray))
  //   .catch((error: Error) => Alert.danger('Error getting posters: ' + error.message));
    // CategoryService
  //   .getAll()
  //   .then((carray) => (allCategorys = carray))
  //   .catch((error: Error) => Alert.danger('Error getting categories: ' + error.message));
    // EmployerService
  //   .getAll()
  //   .then((earray) => (this.allEmployers = earray))
  //   .catch((error: Error) => Alert.danger('Error getting employer: ' + error.message));

    /**
    * Dev-parsing of data
    */
    this.pj                   = projectsDev.find(pj => pj.projectid == this.props.match.params.id);
    this.allPosters           = postersDev;
    this.allThumbnails        = thumbnailsDev;
    this.allCategorys         = projectCategoriesDev;//.find(c => c.categoryId == this.pj.categoryId); // No need to filter
    this.allEmployers         = projectEmployerDev;//.find(e => e.employerId == this.pj.employerid); // No need to filter // OBS! Prosject har liten "i" i sin employerid i service, følgefeil må derfor benyttes til det rettes
  }
}


