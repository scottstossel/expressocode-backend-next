const Blog = require('../models/Blog');
const formidable = require('formidable');
const slugify = require('slugify');
const {stripHtml} = require('string-strip-html');
const _ = require('lodash');
const Category = require('../models/Category');
const Tag = require('../models/Tag');
const {errorHandler} = require('../helpers/dbErrorHandler');
const fs = require('fs');

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not upload'
      });
    }
    const {title, body, categories, tags} = fields;
    // console.log(fields);

    if (!title || !title.length) {
      return res.status(400).json({
        error: 'Title is required'
      })
    }

    if (!body || body.length < 200) {
      return res.status(400).json({
        error: 'Content is too short'
      })
    }

    if (!categories || categories.length === 0) {
      return res.status(400).json({
        error: 'At least one category is required'
      })
    }

    if (!tags || tags.length === 0) {
      return res.status(400).json({
        error: 'At least one tag is required'
      })
    }

    let blog = new Blog();
    blog.title = title;
    blog.body = body; 
    blog.slug = slugify(title).toLowerCase(); 
    blog.mtitle = `${title} | ${process.env.APP_NAME}`; 
    blog.mdesc = stripHtml(body.substring(0, 160)).result;
    blog.postedBy = req.auth._id;
    //categories and tags
    let arrayOfCategories = categories && categories.split(',')
    let arrayOfTags = tags && tags.split(',')

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        });
      }
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }

    blog.save((err, result) => {
      if (err) {
        console.log('BLOG SAVE ERROR:', err)
        return res.status(400).json({
          error: errorHandler(err)
        })
      }
      // res.json(result);
      Blog.findByIdAndUpdate(result._id, {$push: {categories: arrayOfCategories}}, {new: true}).exec(
        (err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err)
          });
        } else {
          Blog.findByIdAndUpdate(result._id, {$push: {tags: arrayOfTags}}, {new: true}).exec(
            (err, result) => {
              if (err) {
                return res.status(400).json({
                  error: errorHandler(err)
              });
          } else {
            res.json(result);
        }})
    }})
  })
})}