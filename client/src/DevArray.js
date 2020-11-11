/*
 ** Denne er kun for å ha tilgang på testdata til webpack og axios call fungerer
 */

import projectservice, { type Project } from './service';
import thumbnailservice, { type Thumbnails } from './service';
import posterservice, { type Poster } from './service';

// Empty one= Project = {projectid: 0, title: '', description : '', projectDate: 0, categoryId: 0, employerid: 0, active: false, ranking: 0};
// Array of devdata
export const projectsDev: Project[] = [
  {
    projectid: 11,
    title: 'nummer11',
    description: 'Test11',
    projectDate: 251193,
    categoryId: 15,
    employerid: 10,
    active: true,
    ranking: 11,
  },
  {
    projectid: 12,
    title: 'nummer12',
    description: 'Test12',
    projectDate: 251193,
    categoryId: 14,
    employerid: 10,
    active: true,
    ranking: 10,
  },
  {
    projectid: 13,
    title: 'nummer13',
    description: 'Test13',
    projectDate: 251193,
    categoryId: 15,
    employerid: 8,
    active: true,
    ranking: 8,
  },
  {
    projectid: 6,
    title: 'nummer6',
    description: 'Test6',
    projectDate: 251193,
    categoryId: 12,
    employerid: 8,
    active: true,
    ranking: 3,
  },
  {
    projectid: 4,
    title: 'nummer4',
    description: 'Test4',
    projectDate: 251193,
    categoryId: 12,
    employerid: 6,
    active: true,
    ranking: 1,
  },
];

//Empty one= export type Thumbnails ={thumbnailid: 0, posterid: 0, url: ''};
// Array of devdata
export const thumbnailsDev: Thumbnails[] = [
  {
    thumbnailid: 5,
    posterid: 1,
    url: 'thumburl5poster1',
  },
  {
    thumbnailid: 2,
    posterid: 2,
    url: 'thumburl2poster2',
  },
  {
    thumbnailid: 6,
    posterid: 3,
    url: 'thumburl6poster3',
  },
  {
    thumbnailid: 7,
    posterid: 4,
    url: 'thumburl7poster4',
  },
  {
    thumbnailid: 8,
    posterid: 8,
    url: 'thumburl8poster8',
  },
  {
    thumbnailid: 9,
    posterid: 10,
    url: 'thumburl9poster10',
  },
  {
    thumbnailid: 20,
    posterid: 15,
    url: 'thumburl20poster15',
  },
];

//Empty one= Poster = {posterid: 0, projectid: 0, description: '', url: ''};
// Array of devdata
export const postersDev: Poster[] = [
  {
    posterid: 1,
    projectid: 4,
    description: 'poster1',
    url: 'urlposter1',
  },
  {
    posterid: 2,
    projectid: 6,
    description: 'poster2',
    url: 'urlposter2',
  },
  {
    posterid: 3,
    projectid: 6,
    description: 'poster3',
    url: 'urlposter3',
  },
  {
    posterid: 4,
    projectid: 6,
    description: 'poster4',
    url: 'urlposter4',
  },
  {
    posterid: 8,
    projectid: 13,
    description: 'poster8',
    url: 'urlposter8',
  },
  {
    posterid: 10,
    projectid: 12,
    description: 'poster12',
    url: 'urlposter12',
  },
  {
    posterid: 15,
    projectid: 11,
    description: 'poster15',
    url: 'urlposter15',
  },
];

//Empty one= Category = {categoryid: 0, categoryname: ''};
// Array of devdata
export const projectCategoriesDev = [
  {
    categoryId: 12,
    categoryname: 'Action',
  },
  {
    categoryId: 15,
    categoryname: 'Bollywood',
  },
  {
    categoryId: 14,
    categoryname: 'Skrekk',
  },
];

//Empty one= employer = {employerId: 0, employername: ''};
// Array of devdata
export const projectEmployerDev = [
  {
    employerId: 6,
    employername: 'Employer6navn',
  },
  {
    employerId: 8,
    employername: 'Employer8navn',
  },
  {
    employerId: 10,
    employername: 'Employer10Navn',
  },
];
