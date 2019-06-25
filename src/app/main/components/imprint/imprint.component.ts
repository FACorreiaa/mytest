import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'imprint',
    templateUrl: 'imprint.component.html',
    styleUrls: ['./imprint.component.scss'],
})
export class ImprintComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        window.scrollTo(0, 0)
    }
}
