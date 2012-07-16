/**
 * MBTA OnTime
 *
 * Author  : Seth Gregory 
 * Version : 1.0
 * Revised : 2011/05/08
 *
 */
 
Disclaimer:
***********
So this isn't really a 1.0 -- more of a 0.8.  Unfortunately, we only had a week to complete it and I was at a conference in San Francisco for the majority of it.  What you see here is mostly what I was able to accomplish working offline on the airplane - understand that this is a proof of concept.

Description:
************
MBTA OnTime is an application to be used for real-time MBTA subway station "next train" predictions.  It also lists the remaining time for subsequent upcoming trains.

Installation/Runtime:
*********************
Just open the index.html - use a Webkit browser.

Points of Interest:
*******************
- JQuery Mobile is still buggy as all heck.  I had to stick with an older version to even make things work at all
- Perhaps related to the above item, I ended up pre-creating the maximum possible number of stations and then hiding ones I didn't need, since adding elements dynamically doesn't allow for them to be styled with jqm.

TODO:
*****
- Make it less ugly, incl. coloration of the individual lines
- Provide an automatic page refresh or refresh button
- Figure out how to tell it to stop caching so that refresh is actually useful
