const express = require('express');
const path = require('path');

exports.homepage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/homepage.html'));
};