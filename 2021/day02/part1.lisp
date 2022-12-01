; part 1

(defvar x 0)
(defvar y 0)
(handler-case
    (loop
        (case (read)
            (FORWARD (setq x (+ x (read))))
            (DOWN (setq y (+ y (read))))
            (UP (setq y (- y (read))))
        )
    )
    (error (c))
)
(write (* x y))
