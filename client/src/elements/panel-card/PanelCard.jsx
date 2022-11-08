import React, {useEffect, useMemo} from 'react';
import './PanelCard.scss'


const PanelCard = ({ type, account, reservation }) => {

    const date = useMemo(() => {
        if (type === 'reservation')
            return new Date(reservation.createdAt)
        if (type === 'account')
            return new Date(reservation.createdAt)
    }, [reservation])

    return (
        <div className="panel-card">
            { type === 'reservation' &&
                <div className="panel-card__info">
                    <div className="panel-card__info_first">
                        <span>{ reservation.reserveeName }</span>
                        <span>@{ reservation.instagramAccount }</span>
                    </div>
                    <div className="panel-card__info_second">
                        <span>{ reservation.numberOfPlaces } places</span>
                        <span>Date:&nbsp;
                            { `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/`
                                + `${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/`
                                + `${date.getFullYear()}` }
                            &nbsp;
                            { `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:`
                                + `${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}
                        </span>
                    </div>
                    <div>{ reservation.comment }</div>
                </div>
            }
            { type === 'account' &&
                <div className="panel-card__info">
                    <div className="panel-card__info_first">
                        <span>{ account.name } { account.surname }</span>
                        <span>{ account.username }</span>
                    </div>
                    <div className="panel-card__info_second">
                        <span>Role: { account.role }</span>
                        <span>Last login:&nbsp;
                            { `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/`
                                + `${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}/`
                                + `${date.getFullYear()}` }
                            &nbsp;
                            { `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:`
                                + `${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`}
                        </span>
                    </div>
                </div>
            }
            <div className="panel-card__buttons">
                <div className="button"></div>
                <div className="button"></div>
            </div>
        </div>
    );
};

export default PanelCard;