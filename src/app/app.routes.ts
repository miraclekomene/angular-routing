import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";

import { routes as userRoutes} from './users/users.routes'
// import { TasksComponent } from "./tasks/tasks.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
// import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

// the first parameter is information about the route that you are trying to match or that you're trying to load.
// And the second parameter is a segments parameter, which is in the end an array of URL path segments.
const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router)
    const shouldGetAccess = Math.random();
    // so that in 50% of all cases I grant access and in the remaining 50% I redirect to unauthorized,
    // if(shouldGetAccess < 0.5){
    if(shouldGetAccess < 1){//to make sure that we always end up on this route where I want to go
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes =[
    {
        path: '',//<your-domain>/
        component: NoTaskComponent,
        // redirectTo: '/users/u1',
        // pathMatch: 'full'
        title: 'No task selected'
    },
    // {
    //     path: 'tasks',//<your-domain>/tasks
    //     component: TasksComponent,
    // }
    {
        //  colon on the other hand, is required
        // because that is what tells Angular
        // that you have a dynamic segment here
        path: 'users/:userId',//<your-domain>/users/<uid> 
        component: UserTasksComponent,
        // OR
        // path: ':userId',//<your-domain>/tasks
        // component: TasksComponent,

        children: userRoutes,
        // children: [
        //     {
        //         path: '',
        //         redirectTo: 'tasks',
        //         pathMatch: 'full',
        //     },
        //     {
        //         path: 'tasks', //<your-domain>/users/<uid>/tasks
        //         component: TasksComponent,
        //     },
        //     {
        //         path: 'tasks/new', //<your-domain>/users/<uid>
        //         component: NewTaskComponent,
        //     },
            
        // ]
        // canMatch guard allows you to control whether this entire route
        // should be matched by a certain navigation action or not.
        canMatch: [dummyCanMatch],
        data: {
            message: 'Hello',
        },
        resolve: {
            userName: resolveUserName
        },
        title: resolveTitle
    },
    // Angular allows you to define a catch all route, here as a last route typically
    // where you set the path to two asterisk. And this route will then be activated if no other route is met.
    {
        path: '**',
        component: NotFoundComponent,
    },
];









// ---------------- Optional: Class-based Guards ----------------
// The previous lecture introduced you to guards using the modern, recommended function-based approach.

// But you can also use an older (deprecated!) class-based approach:

// @Injectable({ providedIn: 'root' })
// class CanMatchTeamSection implements CanMatch {
//   constructor(private router: Router) {}
//   canMatch(route: Route, segments: UrlSegment[]) {
//     const shouldGetAccess = Math.random();
//     if (shouldGetAccess < 0.5) {
//       return true;
//     }
//     return new RedirectCommand(this.router.parseUrl('/unauthorized'));
//   }
// }
// And attach the guard to a route like this:

// {
//   path: 'users/:userId', // <your-domain>/users/<uid>
//   component: UserTasksComponent,
//   children: userRoutes,
//   canMatch: [CanMatchTeamSection],
//   data: {
//     message: 'Hello!',
//   },
//   resolve: {
//     userName: resolveUserName,
//   },
//   title: resolveTitle,
// },