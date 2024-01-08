const express= require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const{users}= require('../model/userModel');
const{authentication}