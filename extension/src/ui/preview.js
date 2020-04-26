/**
 * Copyright TurboNote, 2016. All Rights Reserved.
 * @author Shuo Wu
 */
import Logger from 'js-logger'

app.NotesPreview = function() {};

app.NotesPreview.FONT_TYPE_BOLD = 'bold';
app.NotesPreview.FONT_TYPE_NORMAL = 'normal';

app.NotesPreview.prototype.loaded = false;
app.NotesPreview.prototype.$el = null;
app.NotesPreview.prototype.note = null;

app.NotesPreview.prototype.init = function(noteObj) {
  noteObj = noteObj || {};

  if (this.$el) {
    this.reload(noteObj);
    return;
  }

  this.note = noteObj;
  var title = app.VideoFactory.s().getVideo().getTitle();
  $('body').append(app.templates.menuListNotePreviewContent({title: title, msg: app.msg}).content);
  this.$el = $('#vn-note-preview-container');
  this.createCanvasContainer(noteObj);
  this.bindEvents();
};


app.NotesPreview.prototype.reload = function(noteObj) {
  noteObj = noteObj || {};

  if (!this.$el) {
    this.init(noteObj);
    return;
  }

  this.note = noteObj;
  this.loaded = false;
  this.createCanvasContainer(noteObj);
  this.bindEvents();
};


app.NotesPreview.prototype.createCanvasContainer = function() {
  if (!this.$el) {
    Logger.error('Missing main preview element.');
    return;
  }

  var $canvasContainerEl = this.$el.find('.vn-canvas-container');
  $canvasContainerEl.empty();
  for (var key in this.note) {
    if (key == app.MenuNoteView.KEY_OVERVIEW || !this.note.hasOwnProperty(key)) {
      continue;
    }

    $canvasContainerEl.append(app.templates.canvas({
      key: key,
      time: app.Utils.secondsToTime(key),
      content: this.note[key]['content'],
      msg: app.msg
    }).content);
  }
};


app.NotesPreview.prototype.bindEvents = function() {
  if (!this.$el) {
    Logger.error('Missing main preview element.');
    return;
  }

  var this_ = this;

  var $timeEls = this.$el.find('.vn-time');
  $timeEls.on('click.vn', function() {
    var time = this.dataset.time;
    var video = app.VideoFactory.s().getVideo();
    video.seekTo(time, function() {
      // dismiss preview
      app.Overlay.s().hide();
      $('#vn-note-preview-container').hide();
      $(window).off('scroll.vn');

      // play video
      video.play();
    });
  });

  var $reloadEls = this.$el.find('.vn-reload');
  $reloadEls.on('click.vn', function() {
    var el = this;
    var video = app.VideoFactory.s().getVideo();
    video.getCurrentTime(function(time) {
      this_.drawCanvasItem(el.dataset.time);

      // Resume time back
      setTimeout(function() {
        var video = app.VideoFactory.s().getVideo();
        video.seekTo(time);
      }, 800);
    });
  });

  $reloadEls.hover(function() {
    $(this).siblings('.vn-tooltip-container').show();
  }, function() {
    $(this).siblings('.vn-tooltip-container').hide();
  });

  var $closeEl = this.$el.find('.vn-close-button');
  $closeEl.off('click.vn');
  $closeEl.on('click.vn', function() {
    this_.hide();
  });

  var $generatePdfEl = this.$el.find('.vn-generate-pdf');
  $generatePdfEl.off('click.vn');
  $generatePdfEl.on('click.vn', function() {
    var el = $(this);
    app.MenuNoteView.analytic('clicked', 'generate-report');
    el.prop('disable', true);
    app.MenuNoteView.s().getNotesPostData(function(postData) {
      var postData_ = postData || {};
      postData_['action'] = 'get-share-link';
      app.ajax('/ajax/data', function(res) {
        el.prop('disabled', false);
        if (res && res['error'] == 'Login required') {
          app.Menu.openDialog(app.BACKEND_URL + '/users/login/google');
          app.setPendingAction('share');
          return;
        }

        var url = res['data']['url'];
        this_.generatePDF(url);
      }, postData_);
    });
  });
};


app.NotesPreview.prototype.show = function() {
  var this_ = this;

  if (!this.$el) {
    Logger.error('Missing preview element.');
    return;
  }

  window.scrollTo(0, 0);
  this.setupOverlay();
  this.setupPreviewProperties();
  $('body').css({'overflow-y': 'hidden'});
  var video = app.VideoFactory.s().getVideo();

  // Reset title, title sometime is not properly initialized
  var title = video.getTitle();
  this.$el.find('.vn-preview-header .vn-title').text(title);

  if (this.loaded) {
    video.pause();
    this.$el.show();
    return;
  }

  this.showSpinner();
  video.getCurrentTime(function(time) {
    // draw screenshots by notes
    var interval = 0;
    for (var key in this_.note) {
      if (key == app.MenuNoteView.KEY_OVERVIEW || !this_.note.hasOwnProperty(key)) {
        continue;
      }

      interval += 1000;
      (function(k, i) {
        setTimeout(function() {
          this_.drawCanvasItem(k);
        }, i);
      })(key, interval);
    }

    // Resume video time back
    interval += 800;
    setTimeout(function() {
      var video = app.VideoFactory.s().getVideo();
      video.seekTo(time, function() {
        this_.hideSpinner();
        video.pause();
        this_.$el.show();
        this_.loaded = true;
      });
    }, interval);
  });
};


app.NotesPreview.prototype.hide = function() {
  if (!this.$el) {
    Logger.error('Missing main preview element.');
    return;
  }

  app.Overlay.s().hide();
  this.$el.hide();
  $('body').css({'overflow-y': 'auto'});
};


app.NotesPreview.prototype.setupPreviewProperties = function() {
  if (!this.$el) {
    Logger.error('Missing preview element.');
    return;
  }

  var $canvasContainer = this.$el.find('.vn-canvas-container');
  var $window = $(window);
  var previewWidth = this.$el.width();
  var scrollLeft = $window.scrollLeft();
  var wHeight = $window.height();
  this.$el.css({
    'left': Math.floor(scrollLeft + (window.innerWidth - previewWidth) / 2) + 'px',
    'top': '20px',
    'height': wHeight - 40 + 'px'
  });
  $canvasContainer.height(wHeight - 40 - 85);
};


app.NotesPreview.prototype.setupOverlay = function() {
  var this_ = this;
  var overlay = app.Overlay.s();
  overlay.resize();
  overlay.bind([{
    event: 'click.vn',
    callback: function() {
      this_.hide();
    }
  }]);
};


app.NotesPreview.prototype.drawCanvasItem = function(time) {
  if (!time) {
    Logger.error('Missing required parameters.');
    return;
  }

  var video = app.VideoFactory.s().getVideo();
  var videoEl = video.getVideoElement();
  video.seekTo(time, function() {
    video.pause();
    var canvas = document.getElementById('vn-canvas' + time);
    var c = canvas.getContext('2d');
    setTimeout(function() {
      c.drawImage(videoEl, 0, 0, 400, 200);
    }, 400);
  });
};


app.NotesPreview.prototype.showSpinner = function() {
  $('body').append(app.templates.previewSpinner({msg: app.msg}).content);
  var $spinnerEl = $('#vn-note-preview-spinner');
  var $window = $(window);
  var spinnerWidth = $spinnerEl.width();
  var scrollLeft = $window.scrollLeft();
  $spinnerEl.css({
    'top': '200px',
    'left': Math.floor(scrollLeft + (window.innerWidth - spinnerWidth) / 2) + 'px'
  });
};


app.NotesPreview.prototype.hideSpinner = function() {
  $('#vn-note-preview-spinner').remove();
};


app.NotesPreview.prototype.generatePDF = function(sharedUrl) {
  var title = app.VideoFactory.s().getVideo().getTitle();
  var doc = new jsPDF();
  var y = 20;
  doc.setFontSize(18);
  doc.setFontType(app.NotesPreview.FONT_TYPE_BOLD);
  doc.text(20, y, doc.splitTextToSize(title, 180));
  y += 10;
  doc.setFontType(app.NotesPreview.FONT_TYPE_NORMAL);

  // Handle overview
  if (this.note[app.MenuNoteView.KEY_OVERVIEW]) {
    doc.setFontType(app.NotesPreview.FONT_TYPE_BOLD);
    doc.setFontSize(14);
    doc.text(20, y, '-- Overview --');
    y += 10;
    doc.setFontType(app.NotesPreview.FONT_TYPE_NORMAL);
    doc.setFontSize(12);
    doc.text(20, y, this.note[app.MenuNoteView.KEY_OVERVIEW]['content']);
    y += 10;
  }

  doc.setFontSize(14);
  doc.setFontType(app.NotesPreview.FONT_TYPE_BOLD);
  doc.text(20, y, '-- Notes --');
  y += 10;
  doc.setFontType(app.NotesPreview.FONT_TYPE_NORMAL);
  doc.setFontSize(12);
  var notes = app.Menu.getSortedNotes(this.note);
  for (var i = 0, ii = notes.length; i < ii; i++) {
    var note = notes[i];
    var content = doc.splitTextToSize(note['content'], 180);
    if (y + 66 + 6 + 6 * content.length > 300) {
      doc.addPage();
      y = 20;
    }
    var canvas = document.getElementById('vn-canvas' + note['key']);
    doc.addImage(canvas, 'PNG', 20, y, 100, 60, null, 'NONE');
    y += 66;
    doc.setTextColor(255, 255, 255);
    doc.text(20, y, sharedUrl + '&time=' + note['key']);
    doc.setTextColor(71, 99, 255);
    doc.text(20, y, note['time']);
    doc.setTextColor(0, 0, 0);
    y += 6;
    doc.text(20, y, content);
    y += 6 * content.length;
  }
  doc.save('TurboNote_' + title + '.pdf');
};


app.NotesPreview.s = function() {
  if (!app.notepreview) {
    app.notepreview = new app.NotesPreview();
  }

  return app.notepreview;
};
