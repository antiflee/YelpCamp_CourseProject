var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name:"Cloud's Rest", image:"https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",description:"Suspendisse potenti. Maecenas augue purus, fermentum ac dui quis, maximus varius nunc. Aliquam mollis turpis in rutrum sodales. Pellentesque venenatis ante urna, sed gravida magna sollicitudin a. Cras hendrerit sit amet tellus a feugiat. Maecenas et tincidunt lectus. Sed in ligula ullamcorper, tempus eros non, egestas sem. Phasellus vitae turpis id nunc consectetur varius id id est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam convallis felis id diam blandit, nec auctor ipsum tempus. Vestibulum a accumsan neque. Vestibulum egestas sit amet risus a dignissim. Aenean rutrum velit urna, sed consectetur quam blandit sit amet. Phasellus consequat viverra elementum."
    },
    {
        name:"Great Meadow", image:"https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg",description:"Suspendisse potenti. Maecenas augue purus, fermentum ac dui quis, maximus varius nunc. Aliquam mollis turpis in rutrum sodales. Pellentesque venenatis ante urna, sed gravida magna sollicitudin a. Cras hendrerit sit amet tellus a feugiat. Maecenas et tincidunt lectus. Sed in ligula ullamcorper, tempus eros non, egestas sem. Phasellus vitae turpis id nunc consectetur varius id id est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam convallis felis id diam blandit, nec auctor ipsum tempus. Vestibulum a accumsan neque. Vestibulum egestas sit amet risus a dignissim. Aenean rutrum velit urna, sed consectetur quam blandit sit amet. Phasellus consequat viverra elementum."
    },
    {
        name:"Bad Land", image:"https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",description:"Suspendisse potenti. Maecenas augue purus, fermentum ac dui quis, maximus varius nunc. Aliquam mollis turpis in rutrum sodales. Pellentesque venenatis ante urna, sed gravida magna sollicitudin a. Cras hendrerit sit amet tellus a feugiat. Maecenas et tincidunt lectus. Sed in ligula ullamcorper, tempus eros non, egestas sem. Phasellus vitae turpis id nunc consectetur varius id id est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam convallis felis id diam blandit, nec auctor ipsum tempus. Vestibulum a accumsan neque. Vestibulum egestas sit amet risus a dignissim. Aenean rutrum velit urna, sed consectetur quam blandit sit amet. Phasellus consequat viverra elementum."
    }
]

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    Comment.create({text: "This place is great, but I wish there was internet", author: "Homer"},function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment")
                        }
                    })
                }
            })
        })
    })
};


module.exports = seedDB;