"use strict";

$(window).on("load", function () {
  $(".loader").fadeOut("slow");
});

// Global
$(function () {
  let sidebar_nicescroll_opts = {
      cursoropacitymin: 0,
      cursoropacitymax: 0.8,
      zindex: 892,
    },
    now_layout_class = null;

  var sidebar_nicescroll;
  var update_sidebar_nicescroll = function () {
    let a = setInterval(function () {
      if (sidebar_nicescroll != null) sidebar_nicescroll.resize();
    }, 10);

    setTimeout(function () {
      clearInterval(a);
    }, 600);
  };

  // Sidebar Sub Menu dropdown Code Start
  var sidebar_dropdown = function () {
    if ($(".main-sidebar").length) {
      $(".main-sidebar").niceScroll(sidebar_nicescroll_opts);
      sidebar_nicescroll = $(".main-sidebar").getNiceScroll();

      $(".main-sidebar .sidebar-menu li a.has-dropdown")
        .off("click")
        .on("click", function () {
          var me = $(this);
          me.toggleClass("toggle");
          me.parent()
            .find("> .dropdown-menu")
            .slideToggle(500, function () {
              update_sidebar_nicescroll();
              return false;
            });
          return false;
        });
    }
  };
  sidebar_dropdown();

  $(".nav-collapse-toggle").click(function () {
    $(this).parent().find(".navbar-nav").toggleClass("show");
    return false;
  });

  $(document).on("click", function (e) {
    $(".nav-collapse .navbar-nav").removeClass("show");
  });
  // Sidebar Sub Menu dropdown Code End

  // Sidebar Toggle Js Start
  var toggle_sidebar_mini = function (mini) {
    let body = $("body");

    if (!mini) {
      body.removeClass("sidebar-mini");
      $(".main-sidebar").css({
        overflow: "hidden",
      });
      setTimeout(function () {
        $(".main-sidebar").niceScroll(sidebar_nicescroll_opts);
        sidebar_nicescroll = $(".main-sidebar").getNiceScroll();
      }, 500);
      $(".main-sidebar .sidebar-menu > li > ul .dropdown-title").remove();
      $(".main-sidebar .sidebar-menu > li > a").removeAttr("data-toggle");
      $(".main-sidebar .sidebar-menu > li > a").removeAttr(
        "data-original-title"
      );
      $(".main-sidebar .sidebar-menu > li > a").removeAttr("title");
    } else {
      body.addClass("sidebar-mini");
      body.removeClass("sidebar-show");
      sidebar_nicescroll.remove();
      sidebar_nicescroll = null;
      $(".main-sidebar .sidebar-menu > li").each(function () {
        let me = $(this);

        if (me.find("> .dropdown-menu").length) {
          me.find("> .dropdown-menu").hide();
          me.find("> .dropdown-menu").prepend(
            '<li class="dropdown-title pt-3">' + me.find("> a").text() + "</li>"
          );
        } else {
        }
      });
    }
  };

  $("[data-toggle='sidebar']").click(function () {
    var body = $("body"),
      w = $(window);
    if (w.outerWidth() <= 1024) {
      if (body.hasClass("sidebar-gone")) {
        body.removeClass("sidebar-gone");
        body.addClass("sidebar-show");
      } else {
        body.addClass("sidebar-gone");
        body.removeClass("sidebar-show");
      }

      update_sidebar_nicescroll();
    } else {
      if (body.hasClass("sidebar-mini")) {
        toggle_sidebar_mini(false);
      } else {
        toggle_sidebar_mini(true);
      }
    }

    return false;
  });
  // Sidebar Toggle Js End

  // Sidebar Hide / Show On Responsive Start
  var toggleLayout = function () {
    var w = $(window),
      layout_class = $("body").attr("class") || "",
      layout_classes =
        layout_class.trim().length > 0 ? layout_class.split(" ") : "";
    if (w.outerWidth() <= 1024) {
      if ($("body").hasClass("sidebar-mini")) {
        toggle_sidebar_mini(false);
        $(".main-sidebar").niceScroll(sidebar_nicescroll_opts);
        sidebar_nicescroll = $(".main-sidebar").getNiceScroll();
      }

      $("body").addClass("sidebar-gone");
      $("body").removeClass("sidebar-mini sidebar-show");
      $("body")
        .off("click")
        .on("click", function (e) {
          if ($(e.target).hasClass("sidebar-show")) {
            $("body").removeClass("sidebar-show");
            $("body").addClass("sidebar-gone");
            update_sidebar_nicescroll();
          }
        });
      update_sidebar_nicescroll();
    } else {
      $("body").removeClass("sidebar-gone sidebar-show");
      if (now_layout_class) $("body").addClass(now_layout_class);

      let nav_second_classes = $(".main-sidebar").attr("data-nav-classes"),
        nav_second = $(".main-sidebar");

      if (now_layout_class == nav_second.hasClass("main-sidebar")) {
        nav_second.find(".sidebar-menu li a.has-dropdown").off("click");
        nav_second.find(".sidebar-brand").remove();
        nav_second.removeAttr("class");
        nav_second.addClass(nav_second_classes);

        let main_sidebar = $(".navbar-secondary");
        main_sidebar
          .find(".sidebar-wrapper")
          .addClass("container")
          .removeClass("sidebar-wrapper");
        main_sidebar
          .find(".sidebar-menu")
          .addClass("navbar-nav")
          .removeClass("sidebar-menu");
        main_sidebar.find(".dropdown-menu").hide();
        main_sidebar.removeAttr("style");
        main_sidebar.removeAttr("tabindex");
        main_sidebar.removeAttr("data-nav-classes");
        $(".main-wrapper").addClass("container");
      } else {
        update_sidebar_nicescroll();
      }
    }
  };
  toggleLayout();
  $(window).resize(toggleLayout);
  // Sidebar Hide / Show On Responsive End
});
