import Application from "../models/Application.js";
import jwt from "jsonwebtoken";
import passport from "passport";

export const index = async (req, res, next) => {
    try {
        const applications = await Application.find();

        res.render("applications/index", {
            applications,
            title: "Applications List"
        });
    } catch (error) {
        next (error);
    }
};

export const show = async (req, res, next) => {
    try {
        const application = await findAndVerifyApplication(req);

        res.render("applications/show", {
            application,
            title: "Application View"
        });
    } catch (error) {
        next (error);
    }
};

export const add = async (_, res, next) => {
    try {
        res.render("applications/add", {
            formType: "create",
            title: "New Application"
        });
    } catch (error) {
        next(error);
    }
};

export const edit = async (req, res, next) => {
    try{
        const application = await findAndVerifyApplication(req);

        res.render("applications/edit", {
            application,
            formType: "update",
            title: "Edit Application"
        })
    } catch (error) {
        next (error);
    }
};

export const create = async (req, res, next) => {
    try{
        const { name } = req.body;

        const newApplication = new Application({ name });

        await newApplication.save();

        res.session.notifications = [{
            alertType: "alert-success",
            message: "Application created successfully"
        }];

        res.redirect("/applications");
    } catch (error) {
        req.session.notifications = [{
            alertType: "alert-danger",
            message: "Failed to create application"
        }];
        
        next (error);
    }
};

export const update = async (req, res, next) => {
    try{
        const { name } = req.body;

        const application = await findAndVerifyApplication(req);

        application.name = name;

        await application.save();

        res.session.notifications = [{
            alertType: "alert-success",
            message: "Application was updated successfully"
        }];

        res.redirect("/applications");
    } catch (error) {
        req.session.notifications = [{
            alertType: "alert-danger",
            message: "Application failed to update"
        }];
        next (error);
    }
};

export const remove = async (req, res, next) => {
    try{
        const application = await findAndVerifyApplication(req);

        await Application.findByIdAndDelete(application.id);

        res.session.notifications = [{
            alertType: "alert-success",
            message: "Application created successfully"
        }];

        res.redirect("/applications");
    } catch (error) {
        req.session.notifications = [{
            alertType: "alert-danger",
            message: "Application failed to delete"
        }]
        next (error);
    }
};

async function findAndVerifyApplication(req) {
    const application = await Application.findById(req.params.id);

    if (!application) {
        req.status(404)
        throw new Error("Application does not exist.")
    }
    return application;
}